/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import GetPropertyTypeStaff from '@/app/actions/getPropertyTypeStaff';
import useEditPropertyTypeModal from '@/app/hooks/useEditPropertyTypeModal';
import { Button, Modal, Label, Pagination, Table, TextInput } from 'flowbite-react';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import HeadingDashboard from '@/app/components/HeadingDashboard';

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
  const [propertyTypeList, setPropertyTypeList] = useState<IPropertyType[]>([]);
  const editPropertyTypeModal = useEditPropertyTypeModal();
  const isSuccess = editPropertyTypeModal.isSuccess;
  const axiosAuthClient = useAxiosAuthClient();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState(false);
  const [idDelete, setIdDelete] = useState<any>();
  const [isDeleted, setIsDeleted] = useState(false);
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
      setPropertyTypeList(result);
    }
    setTotalPages(responsePropertyType.totalPages);
  };

  useEffect(() => {
    fetchPropertyType();

    if (isSuccess === true) {
      fetchPropertyType();
      editPropertyTypeModal.onEditReset();
    }

    if (isDeleted === true) {
      fetchPropertyType();
      setIsDeleted(false);
    }
  }, [JSON.stringify(pageable), JSON.stringify(searchName), isSuccess, isDeleted]);

  const handleDeleteProperty = (id: any) => {
    axiosAuthClient
      .delete(`https://holiday-swap.click/api/v1/property-types/${id}`)
      .then(() => {
        setOpenModal(false);
        toast.success('Delete property success');
        setIsDeleted(true);
      })
      .catch((response) => {
        setOpenModal(false);
        toast.error(response.response.data.message);
      });
  };

  const handleSearchNameSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSeachName(e.currentTarget.searchName.value);
  };

  return (
    <Fragment>
      <div className="mt-2">
        <HeadingDashboard
          routerDashboard="/staff"
          pageCurrentContent="List property type"
          pageCurrentRouter="/staff/listPropertyType"
        />
      </div>

      <div className="">
        <div className="pb-6 pt-4">
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
            <Table.HeadCell className="w-[200px]">Property Type Name</Table.HeadCell>
            <Table.HeadCell>Property Type Description</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {propertyTypeList.map((item: IPropertyType, index: any) => (
              <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {pageable.pageNo * pageable.pageSize + index + 1}
                </Table.Cell>
                <Table.Cell>{item.propertyTypeName}</Table.Cell>
                <Table.Cell>{item.propertyTypeDescription}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-3">
                    <div
                      onClick={() => editPropertyTypeModal.onOpen(item)}
                      className="font-medium text-cyan-600 hover:underline hover:cursor-pointer dark:text-cyan-500"
                    >
                      Edit
                    </div>
                    <div
                      onClick={() => {
                        setOpenModal(true);
                        setIdDelete(item.id);
                      }}
                      className="font-medium text-rose-600 hover:underline hover:cursor-pointer dark:text-rose-500"
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

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Delete property type</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Do you want to delete this property type
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button
              color="red"
              className="font-bold"
              onClick={() => handleDeleteProperty(idDelete)}
            >
              Delete
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Fragment>
  );
};

export default ListPropertyType;
