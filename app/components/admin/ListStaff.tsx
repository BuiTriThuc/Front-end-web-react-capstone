'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { BiBlock } from 'react-icons/bi';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdOutlinePending } from 'react-icons/md';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Table, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import { Pagination } from 'flowbite-react';
import axios from 'axios';
import SelectRouterAdmin from './SelectRouterAdmin';

const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Monitored',
    value: 'monitored',
  },
  {
    label: 'Unmonitored',
    value: 'unmonitored',
  },
];

const TABLE_HEAD = ['Email & Username', 'Gender', 'Date of birth', 'Phone', 'Role', 'Status', ''];

const statusList = [
  {
    status: 'ACTIVE',
    icon: BsCheck2Circle,
    color: '#2fde26',
  },
  {
    status: 'BLOCKED',
    icon: BiBlock,
    color: '#e62538',
  },
  {
    status: 'PENDING',
    icon: MdOutlinePending,
    color: '#e06d14',
  },
];

interface ListStaffProps {
  listUser?: any;
}

const ListStaff: React.FC<ListStaffProps> = ({ listUser }) => {
  const [userList, setUserList] = useState(listUser);
  const { data: session } = useSession();
  const axiosAuthClient = useAxiosAuthClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(listUser.totalPages);

  const onPageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://holiday-swap.click/api/v1/users/search?roleIds=1&roleIds=3&limit=10&offset=${
            currentPage - 1
          }&sortProps=id&sortDirection=desc`
        );
        setUserList(response.data);
        setPageCount(response.data.totalPages); // Assuming 10 items per page
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  console.log('check page count', pageCount);

  const handleOnChangeStatus = (id: any, value: any) => {
    const body = value;
    const config = {
      headers: { 'Content-type': 'application/json' },
    };

    axiosAuthClient
      .put(`/users/${id}/status`, body, config)
      .then(async () => {
        toast.success('Update status success');
        const newList = await axios.get(
          `https://holiday-swap.click/api/v1/users/search?roleIds=1&roleIds=3&limit=10&offset=${
            currentPage - 1
          }&sortProps=id&sortDirection=desc`
        );
        setUserList(newList?.data);
        setPageCount(newList.data.totalPages);
      })
      .catch((response) => {
        toast.error(response);
      });
  };

  console.log('Check current page', currentPage);

  return (
    <Fragment>
      <div>
        <div className="mt-10">
          Dashboard {'>'} <span className="text-common">List Staff</span>
        </div>
      </div>
      <SelectRouterAdmin />
      <div className="text-xl font-bold text-common py-5">Management Staff</div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Email & Username</Table.HeadCell>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Gender</Table.HeadCell>
          <Table.HeadCell>Date of birth</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {userList.content.map((item: any, index: number) => {
            return (
              <Table.Row
                key={item.userId}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap flex flex-row gap-2 items-center dark:text-white">
                  <Image
                    src={item.avatar || '/images/placeholder.jpg'}
                    alt="Avatar"
                    width={50}
                    height={50}
                    className="object-cover rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{item.email}</div>
                    <div className="font-base text-sm text-gray-500">{item.username}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>{item.fullName}</Table.Cell>
                <Table.Cell>{item.gender}</Table.Cell>
                <Table.Cell>{format(new Date(item.dob), 'dd-MM-yyyy')}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>{item.role.name}</Table.Cell>
                <Table.Cell>
                  {(() => {
                    let statusText = '';
                    if (item.status === 'ACTIVE') {
                      statusText = 'ACTIVE';
                    } else if (item.status === 'BLOCKED') {
                      statusText = 'BLOCKED';
                    } else if (item.status === 'PENDING') {
                      statusText = 'PENDING';
                    }

                    return (
                      <div
                        className={`py-2 px-1 text-sm text-center  bg-slate-200 rounded-md ${
                          statusText === 'ACTIVE' ? 'text-green-500' : ''
                        } ${statusText === 'BLOCKED' ? 'text-rose-500' : ''} ${
                          statusText === 'PENDING' ? 'text-orange-500' : ''
                        }`}
                      >
                        {statusText}
                      </div>
                    );
                  })()}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span className="text-sky-500 hover:underline cursor-pointer">Edit</span>
                    )}
                  >
                    {(() => {
                      if (item.status === 'ACTIVE') {
                        return (
                          <>
                            {statusList.slice(1, 3).map((status: any, index: number) => (
                              <Dropdown.Item
                                key={index}
                                value={status.status}
                                className="flex items-center gap-2"
                                onClick={() => handleOnChangeStatus(item.userId, status.status)}
                              >
                                <status.icon size={18} color={status.color} />

                                <span className={`text-[${status.color}]`}>{status.status}</span>
                              </Dropdown.Item>
                            ))}
                          </>
                        );
                      } else if (item.status === 'BLOCKED') {
                        const newArrray = statusList.filter(
                          (item) => item.status === 'ACTIVE' || item.status === 'PENDING'
                        );
                        return (
                          <>
                            {newArrray.map((status: any, index: number) => (
                              <Dropdown.Item
                                key={index}
                                value={status.status}
                                className="flex items-center gap-2"
                                onClick={() => handleOnChangeStatus(item.userId, status.status)}
                              >
                                <status.icon size={18} color={status.color} />

                                <span className={`text-[${status.color}]`}>{status.status}</span>
                              </Dropdown.Item>
                            ))}
                          </>
                        );
                      } else if (item.status === 'PENDING') {
                        return (
                          <>
                            {statusList.slice(0, 2).map((status: any, index: number) => (
                              <Dropdown.Item
                                key={index}
                                value={status.status}
                                className="flex items-center gap-2"
                                onClick={() => handleOnChangeStatus(item.userId, status.status)}
                              >
                                <status.icon size={18} color={status.color} />

                                <span className={`text-[${status.color}]`}>{status.status}</span>
                              </Dropdown.Item>
                            ))}
                          </>
                        );
                      }
                    })()}
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <div className="flex py-5 overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </Fragment>
  );
};

export default ListStaff;
