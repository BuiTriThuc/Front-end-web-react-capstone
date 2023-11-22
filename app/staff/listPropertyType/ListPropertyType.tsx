'use client';

import { Table } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import GetPropertyTypeStaff from '@/app/actions/getPropertyTypeStaff';
import ModalEditPropertyType from './ModalEditPropertyType';
import ModalDeletePropertyType from './ModalDeletePropertyType';
interface IPropertyType {
  id: number;
  propertyTypeName: string;
  propertyTypeDescription: string;
  deleted: boolean;
}
interface Pageable {
  pageNo: number;
  pageSize: number;
  sortDirection: string;
  sortBy: string;
}
interface ApiParam {
  searchName: string;
  pageable: Pageable;
}
interface ListPropertyTypeProps {
  propertyViews?: any;
}

const ListPropertyType: React.FC<ListPropertyTypeProps> = () => {
  const router = useRouter();
  const [propertyViewList, setPropertyViewList] = useState<IPropertyType[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setPageable({ ...pageable, pageNo: page - 1 });
  };
  const [pageable, setPageable] = useState<Pageable>({
    pageNo: 0,
    pageSize: 10,
    sortDirection: 'asc',
    sortBy: 'id',
  });
  const [searchName, setSeachName] = useState<string>('');
  const fetchPropertyType = async (id?: number) => {
    const responsePropertyType = await GetPropertyTypeStaff({
      searchName: searchName,
      pageable: pageable,
    });
    {
      const result = responsePropertyType.content.filter((element: any) => element.id != id);
      const theFilterOut = responsePropertyType.content.filter((element: any) => element.id == id);
      result.splice(0, 0, ...theFilterOut);
      setPropertyViewList(result);
    }
    setTotalPages(responsePropertyType.totalPages);
  };
  useEffect(() => {
    fetchPropertyType();
  }, [JSON.stringify(pageable), JSON.stringify(searchName)]);

  return (
    <Fragment>
      <div className="">
        <span className="hover:underline" onClick={() => router.push('/staff')}>
          Dashboard
        </span>{' '}
        {'>'} <span className="text-common">List property view</span>
      </div>

      <div className="py-10">
        <Table>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Property View Name</Table.HeadCell>
            <Table.HeadCell>Property View Description</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {propertyViewList.map((item: IPropertyType, index: any) => (
              <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {pageable.pageNo * pageable.pageSize + index + 1}
                </Table.Cell>
                <Table.Cell>{item.propertyTypeName}</Table.Cell>
                <Table.Cell>{item.propertyTypeDescription}</Table.Cell>
                <Table.Cell>
                  <div className="flex">
                    <ModalEditPropertyType
                      id={item.id}
                      propertyTypeItem={item}
                      callback={() => fetchPropertyType(item.id)}
                    />
                    <ModalDeletePropertyType
                      id={item.id}
                      propertyTypeItem={item}
                      callback={() => fetchPropertyType(item.id)}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className="flex overflow-x-auto sm:justify-center py-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ListPropertyType;
