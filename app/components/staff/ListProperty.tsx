'use client';
import React, { useEffect, useRef, useState } from 'react';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Button, Dropdown, Input, Menu, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type {
  FilterConfirmProps,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import axios from '@/app/libs/axios';
import SearchSelectResort from './SearchSelectResort';
import { useRouter } from 'next/navigation';
import PopChangeStatusPropertyToDeActivate from './PopChangeStatusPropertyToDeActivate';
import PopChangeStatusPropertyToActive from './PopChangeStatusPropertyToActive';
import PopConfirmDeleteProperty from './PopconfirmDeleteProperty';
interface PropertyType {
  id: number;
  propertyName: string;
  propertyDescription: string;
  numberKingBeds: number;
  numberQueenBeds: number;
  numberSingleBeds: number;
  numberDoubleBeds: number;
  numberTwinBeds: number;
  numberFullBeds: number;
  numberSofaBeds: number;
  numberMurphyBeds: number;
  numberBedsRoom: number;
  numberBathRoom: number;
  roomSize: number;
  isDeleted: boolean;
  status: string;
  resortId: number;
  resort: {
    id: number;
    resortName: string;
    resortDescription: string;
    status: string;
    resortImages: [
      {
        id: number;
        resortId: number;
        link: string;
        deleted: boolean;
      }
    ];
    propertyTypes: [
      {
        id: number;
        propertyTypeName: string;
        propertyTypeDescription: string;
        deleted: boolean;
      }
    ];

    addressLine: string;
    locationFormattedName: string;
    locationDescription: string;
    locationCode: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    deleted: boolean;
  };
  propertyType: {
    id: number;
    propertyTypeName: string;
    propertyTypeDescription: string;
    deleted: boolean;
  };
  propertyView: {
    id: number;
    propertyViewName: string;
    propertyViewDescription: string;
    deleted: boolean;
  };
  inRoomAmenityType: [
    {
      id: number;
      inRoomAmenityTypeName: string;
      inRoomAmenityTypeDescription: string;
      isDeleted: boolean;
      inRoomAmenities: [
        {
          id: number;
          inRoomAmenityName: string;
          inRoomAmenityDescription: string;
          inRoomAmenityLinkIcon: string;
          isDeleted: boolean;
          inRoomAmenityTypeId: number;
        }
      ];
    }
  ];
  propertyImage: [
    {
      id: number;
      propertyId: number;
      link: string;
      deleted: boolean;
    }
  ];
  rating: number;
}
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  defaultCurrent?: number;
  pageSizeOptions?: string[] | number[];
  filters?: Record<string, FilterValue>;
  sorter?: SorterResult<PropertyType>;
}
type DataIndex = keyof PropertyType;
export default function ListProperty() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<PropertyType[]>();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: 1,
    },
  });
  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<PropertyType>
  ) => {
    setTableParams({
      pagination,
      filters,
      sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setProperties([]);
    }
  };
  const fetchProperties = () => {
    console.log('tableParams: ', tableParams);
    let url = 'https://holiday-swap.click/api/v1/properties';
    let pageNo = `?pageNo=${
      tableParams.pagination?.current !== undefined ? tableParams.pagination.current - 1 : 0
    }`;
    let resortId = tableParams.filters?.resortId
      ? `&resortId=${tableParams.filters?.resortId}`
      : '';
    let propertyName = `&propertyName=${tableParams.filters?.propertyName ?? ''}`;
    let status = `&status=${tableParams.filters?.status ?? ''}`;
    let pageSize = `&pageSize=${tableParams.pagination?.pageSize ?? ''}`;
    let sortDirection = `&sortDirection=${
      tableParams.sorter?.order == 'ascend' ? 'asc' : 'desc' ?? ''
    }`;
    let sortBy = `&sortBy=${tableParams.sorter?.column?.key ?? ''}`;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url
        .concat(pageNo)
        .concat(pageSize)
        .concat(sortBy)
        .concat(sortDirection)
        .concat(propertyName)
        .concat(status)
        .concat(resortId),
      headers: {},
    };

    setLoading(true);
    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        console.log('content: ', response.data);
        setProperties(response.data.content);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.totalElements,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setTableParams({
      ...tableParams,
      filters: {
        ...tableParams.filters,
        [dataIndex]: selectedKeys,
      },
    });
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<PropertyType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block', width: '200px' }}
        />
        <Space className="flex justify-between">
          <Button
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            danger
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<PropertyType> = [
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    //   key: 'id',
    //   sorter: true,
    // },
    {
      title: 'Property Name',
      dataIndex: 'propertyName',
      key: 'id',
      ...getColumnSearchProps('propertyName'),
      sorter: true,
      sortOrder: tableParams.sorter?.column?.key === 'id' ? tableParams.sorter.order : null,
    },
    {
      title: 'Property Description',
      dataIndex: 'propertyDescription',
      key: 'propertyDescription',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filterMode: 'tree',
      filteredValue: tableParams.filters?.status || null,
      filters: [
        {
          text: 'Active',
          value: 'ACTIVE',
        },
        {
          text: 'Deactivate',
          value: 'DEACTIVATE',
        },
        {
          text: 'No Longer In Business',
          value: 'NO_LONGER_IN_BUSINESS',
        },
      ],
    },
    {
      title: 'Resort Name',
      dataIndex: 'resortId',
      key: 'resortId',
      render: (_, record) => `${record.resort.resortName}`,
      sorter: true,
      sortOrder: tableParams.sorter?.column?.key === 'resortId' ? tableParams.sorter.order : null,
    },
    {
      // title: 'Action',
      render: (_, record) => (
        <Space>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0">
                  <Button
                    type="primary"
                    style={{ color: 'white', backgroundColor: 'green', width: 74.4 }}
                    onClick={() => route.push(`/staff/detailProperty/${record.id}`)}
                  >
                    Detail
                  </Button>
                </Menu.Item>
                <Menu.Item key="1">
                  <Button
                    type="primary"
                    style={{ color: 'white', backgroundColor: 'orange', width: 74.4 }}
                    onClick={() => route.push(`/staff/editProperty/${record.id}`)}
                  >
                    Edit
                  </Button>
                </Menu.Item>
                <Menu.Item key="2">
                  <PopConfirmDeleteProperty id={record.id} fetchProperties={fetchProperties} />
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Button>
                  Action
                  <DownOutlined />
                </Button>
              </Space>
            </a>
          </Dropdown>
          <Dropdown
            overlay={
              <Menu>
                {record.status == 'ACTIVE' ? (
                  <Menu.Item key="0">
                    <PopChangeStatusPropertyToDeActivate
                      id={record.id}
                      fetchProperties={fetchProperties}
                    />
                  </Menu.Item>
                ) : (
                  <Menu.Item key="0">
                    <PopChangeStatusPropertyToActive
                      id={record.id}
                      fetchProperties={fetchProperties}
                    />
                  </Menu.Item>
                )}
              </Menu>
            }
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Button>
                  Status
                  <DownOutlined />
                </Button>
              </Space>
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mt-8 mb-10">
        <div>
          Staff {'> '}
          <span className="text-common">List property</span>
        </div>
      </div>
      <div>
        <SearchSelectResort setTableParams={setTableParams} tableParams={tableParams} />
        <Table
          columns={columns}
          dataSource={properties}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={(pagination: any, filters: any, sorter: any) =>
            handleTableChange(pagination, filters, sorter)
          }
        />
      </div>
    </div>
  );
}
