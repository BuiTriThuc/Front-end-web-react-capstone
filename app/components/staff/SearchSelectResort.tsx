import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Button, Select, Space, Spin, Typography } from 'antd';
import type { SelectProps } from 'antd/es/select';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect
interface ResortValue {
  label: string;
  value: string;
}

async function fetchListResort(resortname: string): Promise<ResortValue[]> {
  console.log('fetching resort', resortname);
  let url = `https://holiday-swap.click/api/v1/resorts?`;
  let resortName = `nameResort=${resortname}`;
  return fetch(url.concat(resortName))
    .then((response) => response.json())
    .then((body) => {
      return body.content.map((resort: { id: number; resortName: string }) => ({
        label: `${resort.resortName}`,
        value: resort.id,
      }));
    });
}
interface SearchSelectResortProps {
  setResortIdSelect?: (newValue: number[]) => void;
  setTableParams: (newValue: any) => void;
  tableParams: any;
}
const SearchSelectResort: React.FC<SearchSelectResortProps> = ({ setTableParams, tableParams }) => {
  const defaultPagination: TableParams = {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      defaultCurrent: 1,
    },
  };
  const [value, setValue] = useState<ResortValue[]>([]);
  const handlerOnSelect = (newValue: ResortValue | ResortValue[]) => {
    setValue(newValue as ResortValue[]);
    const selectedValues = Array.isArray(newValue) ? newValue : [newValue];
    var value = selectedValues.map((e) => e.value);
    var newTableParams = {
      ...tableParams,
      filters: {
        resortId: value.length > 0 ? value : undefined,
      },
      sorter: {},
      pagination: { ...tableParams.pagination, ...defaultPagination.pagination },
    };
    setTableParams(newTableParams);
    console.log('tableParams :', newTableParams);
  };
  const clearAll = () => {
    setTableParams(defaultPagination);
  };
  return (
    <Space style={{ width: '100%' }} align="end">
      <div style={{ width: '300px' }}>
        <p>Filter by resort</p>
        <DebounceSelect
          mode="multiple"
          allowClear
          maxTagCount={'responsive'}
          value={value}
          placeholder="Select resort"
          fetchOptions={fetchListResort}
          onChange={(newValue: ResortValue | ResortValue[]) => {
            handlerOnSelect(newValue);
          }}
          style={{ width: '100%' }}
        />
      </div>
      <Space direction="vertical" style={{ width: '30%' }}>
        {/* <Typography.Text>Filter by resort</Typography.Text> */}

        <Button style={{ backgroundColor: 'rgb(92, 152, 242)', color: 'white' }} onClick={clearAll}>
          Clear filters and sorters
        </Button>
      </Space>
    </Space>
  );
};

export default SearchSelectResort;
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  defaultCurrent?: number;
  pageSizeOptions?: string[] | number[];
  filters?: Record<string, FilterValue>;
  sorter?: SorterResult<any>;
}
