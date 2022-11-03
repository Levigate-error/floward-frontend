import React, {
  lazy,
  ReactNode, Suspense,
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSnackbar } from 'notistack';
import { Filters } from 'components/Filtration/types';
import displayRequestError from 'utils/displayRequestError';
import Table from 'components/Table/styled';
import {
  ParserObject,
  ParserObjectAlterableWithId,
  TableActionsAlterable,
  TableActionsButton,
  TableActionsEditable,
  UseTableProps,
  UseTableReturnType,
} from './types';

const Popconfirm = lazy(() => import('antd').then((module) => ({ default: module.Popconfirm })));
const Switch = lazy(() => import('antd').then((module) => ({ default: module.Switch })));
const Input = lazy(() => import('components/Input'));

const useTable = ({
  id,
  apiActions: {
    getAll,
    saveOne,
    removeByIds,
  },
  parseLoadedData,
  parserObject,
  filtration,
  tableActions,
  sortBySlug,
  defaultFilter,
  parseSaveDataProp,
}: UseTableProps): UseTableReturnType => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState<Filters>(filtration?.filters || {});
  const [filtersActive, setFiltersActive] = useState<boolean>(false);
  const [alteredItem, setAlteredItem] = useState<DataType | null>(null);

  const loadData = useCallback(async (useFilters?: boolean) => {
    setLoading(true);

    if (useFilters) {
      setFiltersActive(Object.values(filters).some((filter) => filter.value));
    }

    let query: QueryType | undefined = (useFilters || filtersActive)
      ? {}
      : undefined;
    if (query) {
      Object.entries(filters)
        .forEach(([filterSlug, filter]) => {
          if (filter.value) {
            query![filterSlug] = filter.value;
          }
        });
    }
    if (defaultFilter) {
      query = query ? { ...defaultFilter, ...query } : defaultFilter;
    }

    await getAll({})
      .then((res) => {
        if (!parseLoadedData) {
          setData(res?.data?.result?.content || res?.data?.result || res?.data || res || []);
        } else {
          parseLoadedData({
            res,
            setData,
          });
        }
      })
      .catch((e) => {
        displayRequestError(enqueueSnackbar, e, 'Произошла ошибка при попытке получения данных');
      });
    setLoading(false);
    // eslint-disable-next-line
  }, [filters, id]);

  const onRemove = useCallback(async (ids: number[]) => {
    if (removeByIds) {
      setLoading(true);

      await removeByIds({ ids })
        .then(() => {
          setSelectedRows([]);
          loadData()
            .then();
        })
        .catch((e) => {
          displayRequestError(enqueueSnackbar, e, 'Произошла ошибка при попытке удаления данных');
        });

      setLoading(false);
    }
  }, [loadData, removeByIds, enqueueSnackbar]);

  const onCreate = useCallback(() => {
    if (alteredItem?.id === 0) setAlteredItem(null);
    else {
      setAlteredItem({
        id: 0,
        ...Object.fromEntries(Object.entries(parserObject)
          .map(([k, v]) => (
            [k, (v as ParserObjectAlterableWithId).type === 'text' ? '' : 0]
          ))),
      });
    }
  }, [alteredItem, parserObject]);

  const save = useCallback(async (newItem: DataType | null) => {
    if (loading) return;

    if (!newItem) {
      console.error('useTable (save): newItem is null');
    }

    if (!saveOne) {
      console.error('useTable: saveOne was not provided');
      return;
    }

    setLoading(true);

    await saveOne({
      id: newItem!.id as string | number | undefined || null,
      data: typeof parseSaveDataProp === 'function'
        ? parseSaveDataProp(Object.fromEntries(Object.entries(newItem!).filter(([k]) => !['key', 'id'].includes(k))))
        : Object.fromEntries(Object.entries(newItem!).filter(([k]) => !['key', 'id'].includes(k))),
    })
      .then(() => {
        setAlteredItem(null);
        loadData().then();
      })
      .catch((e) => {
        displayRequestError(enqueueSnackbar, e, 'Произошла ошибка при попытке сохрания данных');
      });

    setLoading(false);
  }, [loading, saveOne, parseSaveDataProp, loadData, enqueueSnackbar]);

  const onSave = useCallback(async () => {
    await save(alteredItem);
  }, [save, alteredItem]);

  const onCancelSave = (): void => {
    setAlteredItem(null);
  };

  useEffect(() => {
    loadData().then();
    // eslint-disable-next-line
  }, [id]);

  // turn off using filters if all of them became empty
  useEffect(() => {
    if (filtersActive) {
      const filterValues = Object.values(filters);
      for (let i = 0; i < filterValues.length; i++) {
        if (filterValues[i].value) {
          return;
        }
      }
      setFiltersActive(false);
      loadData().then();
    }
    // eslint-disable-next-line
  }, [filters]);

  useEffect(() => {
    setSelectedRows([]);
  }, [data]);

  const tableColumns = useMemo<any[]>(() => {
    const columns: any[] = Object.entries(parserObject).map(([key, value]) => ({
      title: typeof value === 'string' ? value : value.title,
      render: ((value as ParserObject)?.switchable && ((text: any, record: any): ReactNode => (
        <Suspense fallback={null}>
          <Switch
            checked={record[key]}
            onChange={() => (
              !alteredItem
                ? (typeof (value as ParserObject).onSwitch === 'function'
                  ? (value as ParserObject).onSwitch!(record.id, !record[key])
                  : save({ ...record, [key]: !record[key] }))
                : setAlteredItem({ ...alteredItem, [key]: !record[key] })
            )}
          />
        </Suspense>
      )))
        || (((tableActions as TableActionsAlterable)?.alterable && alteredItem)
        && ((text: any, record: any): any => {
          if (record.id !== alteredItem?.id) {
            return (typeof value !== 'string' && value.render
              && (value.render ? value.render(text, record) : text)) || text;
          }

          switch ((value as ParserObjectAlterableWithId).type) {
            case 'number':
            case 'text':
              return (
                <Suspense fallback={null}>
                  <Input
                    value={(alteredItem as any)[key]}
                    onChange={(v) => setAlteredItem({ ...alteredItem, [key]: v })}
                    type={record.type}
                  />
                </Suspense>
              );
            default:
              return (typeof value !== 'string' && value.render
                && (value.render ? value.render(text, record) : text)) || text;
          }
        })) || (typeof value !== 'string' && value.render
        ? (text: any, record: any) => (value.render ? value.render(text, record) : undefined)
        : undefined),
      onHeaderCell: () => ({
        style: {
          width: (value as ParserObject).width,
          minWidth: (value as ParserObject).minWidth
            || (!(value as ParserObject).width
            && !(value as ParserObject).minWidth
            && !(value as ParserObject).maxWidth ? '200px' : undefined),
          maxWidth: (value as ParserObject).maxWidth,
        },
      }),
      ellipsis: typeof value !== 'string' && value.ellipsis !== undefined
        ? value.ellipsis
        : !!(typeof value !== 'string' && value.width),
      dataIndex: key,
      key,
    }));

    if (tableActions) {
      const tableButtons: TableActionsButton[] = tableActions.buttons?.slice() || [];
      const { editUrl } = tableActions as TableActionsEditable;
      const { alterable } = tableActions as TableActionsAlterable;

      const actions: any = {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        onHeaderCell: () => ({
          style: {
            width: 'fit-content',
          },
        }),
        render: (text: any, record: any) => (
          <Table.Actions>
            {tableButtons.map((value): ReactNode => (
              (!alteredItem || (alteredItem && value.showOnEdit === undefined)) ? (
                <Table.Button
                  {...(typeof value.buttonProps === 'function' ? value.buttonProps(record) : value.buttonProps)}
                  onClick={() => (value.onClick ? value.onClick(record) : null)}
                  key={`${value.key}-${record.id}`}
                >
                  {value.content}
                </Table.Button>
              ) : null))}
            {(tableActions.presets?.edit
              && (editUrl || alterable) && (!record.id || record.id !== alteredItem?.id)) && (
              <Table.Button
                {...(alterable ? {
                  onClick: () => {
                    setAlteredItem({ ...record });
                  },
                } : {
                  href: typeof editUrl === 'function' ? editUrl(record.id) : editUrl,
                })}
                key="actions-edit"
              >
                Редактировать
              </Table.Button>
            )}
            {(record.id && record.id === alteredItem?.id) ? (
              <>
                <Table.Button key="actions-save" onClick={onSave}>
                  Сохранить
                </Table.Button>
                <Table.Button key="actions-cancel" onClick={onCancelSave}>
                  Отменить
                </Table.Button>
              </>
            ) : (tableActions.presets?.remove) && (
              <Suspense fallback={null} key="actions-remove">
                <Popconfirm
                  title="Вы уверены?"
                  trigger="click"
                  okText="Да"
                  cancelText="Назад"
                  placement="topRight"
                  onConfirm={() => onRemove([record.id])}
                >
                  <div>
                    <Table.Button styleType="danger">
                      Удалить
                    </Table.Button>
                  </div>
                </Popconfirm>
              </Suspense>
            )}
          </Table.Actions>
        ),
      };

      columns.push(actions);
    }

    return columns;
  }, [save, tableActions, alteredItem, parserObject, onSave, onRemove]);

  const sortedData = useMemo(() => data.slice().sort((a, b) => (
    a[sortBySlug || 'id'] < b[sortBySlug || 'id'] ? -1 : 1
  )), [data, sortBySlug]);

  const formattedData = useMemo(() => {
    const newData = sortBySlug ? sortedData.slice() : data.slice();
    if (alteredItem?.id === 0) {
      newData.unshift(alteredItem);
    }
    return newData;
  }, [sortBySlug, sortedData, data, alteredItem]);

  return {
    loading,
    setLoading,
    loadData,
    data: sortedData,
    unsortedData: data,
    setData,
    tableData: formattedData.map((item, index) => ({ ...item, key: item.id || index })),
    tableColumns,
    onRemove,
    onCreate,
    selectedRows,
    setSelectedRows,
    filtration: {
      filters,
      setFilters,
      buttonPresets: filtration?.buttonPresets,
      get filterSlugs() {
        return Object.keys(filters);
      },
      onFilterSearch: () => loadData(true),
    },
  };
};

export default useTable;
