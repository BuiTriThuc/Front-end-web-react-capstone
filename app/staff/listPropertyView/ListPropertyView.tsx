'use client';

import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import axios from 'axios';
import useEditPropertyViewModal from '@/app/hooks/useEditPropertyViewModal';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import GetPropertyViewStaff from '@/app/actions/getPropertyViewStaff';
import HeadingDashboard from '@/app/components/HeadingDashboard';

interface ListPropertyViewProps {
  propertyViews?: any;
}

interface Pageable {
  pageNo: number;
  pageSize: number;
  sortDirection: string;
  sortBy: string;
}

const ListPropertyView: React.FC<ListPropertyViewProps> = () => {
  const router = useRouter();
  const [propertyViewList, setPropertyViewList] = useState<any[]>([]);
  const editPropertyViewModal = useEditPropertyViewModal();
  const isSuccess = editPropertyViewModal.isSuccess;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [idDelete, setIdDelete] = useState<any>();
  const [isDeleted, setIsDeleted] = useState(false);
  const axiosAuthClient = useAxiosAuthClient();

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
  const fetchPropertyView = async (id?: number) => {
    const responsePropertyView = await GetPropertyViewStaff({
      searchName: searchName,
      pageable: pageable,
    });
    {
      const result = responsePropertyView.content.filter((element: any) => element.id != id);
      const theFilterOut = responsePropertyView.content.filter((element: any) => element.id == id);
      result.splice(0, 0, ...theFilterOut);
      setPropertyViewList(result);
    }
    setTotalPages(responsePropertyView.totalPages);
  };

  useEffect(() => {
    fetchPropertyView();

    if (isSuccess === true) {
      fetchPropertyView();
      editPropertyViewModal.onEditReset();
    }

    if (isDeleted === true) {
      fetchPropertyView();
      setIsDeleted(false);
    }
  }, [JSON.stringify(pageable), JSON.stringify(searchName), isSuccess, isDeleted]);

  const handleDeleteProperty = (id: any) => {
    axiosAuthClient
      .delete(`https://holiday-swap.click/api/v1/property-view/${id}`)
      .then(() => {
        setOpenModal(false);
        setIsDeleted(true);
        toast.success('Delete property success');
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
          pageCurrentContent="List property view"
          pageCurrentRouter="/staff/listPropertyView"
        />
      </div>

      <div className="">
        <div className="pb-5 pt-3">
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
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Property View Name</Table.HeadCell>
            <Table.HeadCell>Property View Description</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {propertyViewList?.map((item: any, index: any) => (
              <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.id}
                </Table.Cell>
                <Table.Cell>{item.propertyViewName}</Table.Cell>
                <Table.Cell>{item.propertyViewDescription}</Table.Cell>
                <Table.Cell className="flex flex-row gap-3">
                  <div
                    onClick={() => editPropertyViewModal.onOpen(item)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
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
          <Modal.Header>Delete property view</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Do you want to delete this property view
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

export default ListPropertyView;
