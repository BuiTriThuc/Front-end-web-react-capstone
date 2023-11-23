/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Label, Pagination, Table, TextInput } from 'flowbite-react';
import GetPropertyTypeStaff from '@/app/actions/getPropertyTypeStaff';
import useEditPropertyTypeModal from '@/app/hooks/useEditPropertyTypeModal';
import useDeletePropertyTypeModal from '@/app/hooks/useDeletePropertyTypeModal';
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
interface ListPropertyTypeProps {
  propertyViews?: any;
}

const ListPropertyType: React.FC<ListPropertyTypeProps> = () => {
  const router = useRouter();
  const [propertyViewList, setPropertyViewList] = useState<IPropertyType[]>([]);
  const editPropertyTypeModal = useEditPropertyTypeModal();
  const deletePropertyTypeModal = useDeletePropertyTypeModal();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setPageable({ ...pageable, pageNo: page - 1 });
  };
  const [pageable, setPageable] = useState<Pageable>({
    pageNo: 0,
    pageSize: 10,
    sortDirection: 'desc',
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
  const handleEditClick = (item: IPropertyType) => {
    editPropertyTypeModal.item = item;
    editPropertyTypeModal.onOpen();
  };
  const handleDeleteClick = (item: IPropertyType) => {
    deletePropertyTypeModal.item = item;
    deletePropertyTypeModal.onOpen();
  };
  useEffect(() => {
    fetchPropertyType(editPropertyTypeModal.item.id);
  }, [
    JSON.stringify(pageable),
    JSON.stringify(searchName),
    editPropertyTypeModal.isSuccess,
    deletePropertyTypeModal.isSuccess,
  ]);

  function handleSearchNameSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setSeachName(e.currentTarget.searchName.value);
  }

  return (
    <Fragment>
      <div className="">
        <span className="hover:underline" onClick={() => router.push('/staff')}>
          Dashboard
        </span>
        {'>'} <span className="text-common">List property view</span>
      </div>

      <div className="py-10">
        <div className="my-2  ">
          <form onSubmit={(e) => handleSearchNameSubmit(e)}>
            <Label
              htmlFor="searchName"
              value="Search Name: "
              className="mx-1 inline-block align-middle"
            />
            <div className="flex">
              <TextInput name="searchName" type="text" className="mx-1" />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
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
                    <div
                      onClick={() => handleEditClick(item)}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-1"
                    >
                      Edit
                    </div>
                    <div
                      onClick={() => handleDeleteClick(item)}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-1"
                    >
                      Delete
                    </div>
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
