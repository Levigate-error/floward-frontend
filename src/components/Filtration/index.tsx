import React, {
  FC, lazy, Suspense, useCallback, useEffect, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Popover, Space } from 'antd';
import debounce from 'lodash.debounce';
import Button from 'components/Button';
import { Filters, FiltrationProps } from './types';

const filterIcon: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'filter' });

const Input = lazy(() => import('components/Input'));
const Select = lazy(() => import('components/Select'));
const DatePicker = lazy(() => import('components/DatePicker'));

const Filtration: FC<FiltrationProps> = ({
  buttonPresets, filters, setFilters, filterSlugs, onFilterSearch,
}) => {
  const [localFilterValues, setLocalFilterValues] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const newLocalFilters: Record<string, any> = { ...filters };

    Object.entries(filters).forEach(([key, filter]) => {
      newLocalFilters[key] = filter.value;
    });

    setLocalFilterValues(newLocalFilters);
  }, [filters]);

  // eslint-disable-next-line
  const onSetFilters = useCallback(debounce((newLocalFilterValues: typeof localFilterValues): void => {
    if (newLocalFilterValues) {
      const newFilters: Filters = { ...filters };
      Object.entries(newLocalFilterValues).forEach(([key, value]) => {
        newFilters[key] = {
          ...filters[key],
          value,
        };
      });
      setFilters(newFilters);
    }
  }, 500), []);

  const onSetLocalFilterValues = (value: any, filterSlug: string): void => {
    if (localFilterValues && setLocalFilterValues) {
      const newLocalFilterValues: typeof localFilterValues = {
        ...localFilterValues,
        [filterSlug]: value,
      };
      setLocalFilterValues(newLocalFilterValues);
      onSetFilters(newLocalFilterValues);
    }
  };

  const onResetFilters = (): void => {
    const newFilters = { ...filters };
    Object.keys(newFilters).forEach((filterSlug) => {
      newFilters[filterSlug].value = undefined;
    });
    setFilters(newFilters);
  };

  return (
    <Popover
      placement="bottomRight"
      title="Filter"
      trigger="click"
      overlayStyle={{
        width: '300px',
      }}
      content={(
        <Space direction="vertical" size={16}>
          {filterSlugs?.map((filterSlug) => {
            const filter = filters[filterSlug];
            switch (filter.type) {
              case 'text':
              case 'number':
                return (
                  <Suspense fallback={null} key={filterSlug}>
                    <Input
                      value={localFilterValues?.[filterSlug] || filter.defaultValue || ''}
                      type={filter.type}
                      placeholder={filter.label}
                      onInput={(v) => onSetLocalFilterValues(v, filterSlug)}
                    />
                  </Suspense>
                );
              case 'select':
                return (
                  <Suspense fallback={null} key={filterSlug}>
                    <Select
                      selectProps={{
                        ...filter.selectProps,
                        allowClear: true,
                      }}
                      value={localFilterValues?.[filterSlug] || filter.defaultValue || ''}
                      label={filter.label}
                      options={filter.options}
                      onChange={(v) => onSetLocalFilterValues(v, filterSlug)}
                    />
                  </Suspense>
                );
              case 'date':
                return (
                  <Suspense fallback={null} key={filterSlug}>
                    <DatePicker
                      value={localFilterValues?.[filterSlug] || filter.defaultValue || ''}
                      label={filter.label}
                      format={filter.format}
                      onChange={(v) => onSetLocalFilterValues(v, filterSlug)}
                    />
                  </Suspense>
                );
              default:
                return null;
            }
          })}
          {buttonPresets?.length && (
            <Space direction="vertical" size={8}>
              {buttonPresets.includes('search') && (
                <Button fw onClick={onFilterSearch}>Search</Button>
              )}
              {buttonPresets.includes('reset') && (
                <Button fw onClick={onResetFilters}>Reset</Button>
              )}
            </Space>
          )}
        </Space>
      )}
    >
      <div>
        <Button even>
          <FontAwesomeIcon icon={filterIcon} />
        </Button>
      </div>
    </Popover>
  );
};

export default Filtration;
