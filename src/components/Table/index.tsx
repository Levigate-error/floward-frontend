import React, { FC, lazy, Suspense } from 'react';
import { Table as TableAntD, Empty } from 'antd';
import Button from 'components/Button';
import Loading from 'components/Loading';
import Styled from './styled';
import { TableType } from './types';

const Filtration = lazy(() => import('components/Filtration'));
const Title = lazy(() => import('components/Title'));
const Popconfirm = lazy(() => import('antd').then((module) => ({ default: module.Popconfirm })));

const Table: FC<TableType> = ({
  tableProps,
  availablePerPages,
  title,
  description,
  page,
  perPage = 10,
  total,
  havePagination,
  loading,
  onRemoveSelected,
  filtration,
  additionalHeaderContent,
}) => (
  <Styled.Wrapper>
    <Styled.Content>
      {loading && <Loading />}

      {(!!title || !!description || !!filtration || !!additionalHeaderContent || !!onRemoveSelected) && (
        <Styled.ContentHeader withInfo={!!title || !!description}>
          {(title || description) && (
            <Styled.Info>
              {title && (
                <Suspense fallback={null}>
                  <Title>{title}</Title>
                </Suspense>
              )}
              {description && <Styled.Description>{description}</Styled.Description>}
            </Styled.Info>
          )}
          {additionalHeaderContent}
          {!!filtration && (
            <Suspense fallback={null}>
              <Filtration {...filtration} />
            </Suspense>
          )}
          {onRemoveSelected && (
            <Suspense fallback={null}>
              <Popconfirm
                title="Вы уверены?"
                trigger="click"
                okText="Да"
                cancelText="Назад"
                placement="topRight"
                onConfirm={onRemoveSelected}
              >
                <div>
                  <Button>
                    Удалить выбранное
                  </Button>
                </div>
              </Popconfirm>
            </Suspense>
          )}
        </Styled.ContentHeader>
      )}

      {((tableProps?.columns?.length as number) > 0 && (tableProps?.dataSource?.length as number) > 0) ? (
        <TableAntD
          tableLayout="auto"
          {...tableProps}
          pagination={havePagination ? {
            position: ['bottomCenter'],
            hideOnSinglePage: total ? total <= 10 : false,
            total,
            current: page,
            defaultPageSize: perPage,
            showSizeChanger: true,
            pageSizeOptions: availablePerPages || [10, 20, 50, 100],
          } : false}
        />
      ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </Styled.Content>
  </Styled.Wrapper>
);

export default Table;
