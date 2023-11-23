'use client';

import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import useCreateOwnershipModal from '@/app/hooks/useCreateOwnershipModal';

import axios from 'axios';
import { format } from 'date-fns';
import { Dropdown, Pagination, Table } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiBlock } from 'react-icons/bi';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdOutlinePending } from 'react-icons/md';
import SelectRouterStaff from './SelectRouterStaff';

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

const TABLE_HEAD = [
  'Property ID',
  'Room ID',
  'User ID',
  'Start date',
  'End date',
  'Type',
  'Status',
  '',
];

const statusList = [
  {
    status: 'ACCEPTED',
    icon: BsCheck2Circle,
    color: '#2fde26',
  },
  {
    status: 'REJECTED',
    icon: BiBlock,
    color: '#e62538',
  },
  {
    status: 'PENDING',
    icon: MdOutlinePending,
    color: '#e06d14',
  },
];

interface OwnershipProps {
  ownershipStaff?: any;
}

const ListApproveOwnership: React.FC<OwnershipProps> = ({ ownershipStaff }) => {
  const [ownershipUserList, setOwnershipUserList] = useState(ownershipStaff);
  const router = useRouter();

  const onPageChange = (page: number) => setCurrentPage(page);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const axiosAuthClient = useAxiosAuthClient();
  const fetchData = async () => {
    try {
      setLoading(true);

      let apiUrl = `https://holiday-swap.click/api/co-owners?pageNo=${
        currentPage - 1
      }&pageSize=8&sortBy=property_id&sortDirection=desc`;

      // If search term is present, include it in the API call
      if (searchTerm) {
        apiUrl += `&roomId=${searchTerm}`;
      }

      const ownerships = await axios.get(apiUrl);

      setOwnershipUserList(ownerships?.data);
      setTotalPages(ownerships?.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownershipStaff) {
      setTotalPages(ownershipStaff.totalPages);
    }
  }, [ownershipStaff]);

  useEffect(() => {
    fetchData();
  }, [currentPage, totalPages]);

  return (
    <div>
      <div className="mt-8 mb-10">
        <div>
          Staff {'> '}
          <span className="text-common">List Approve Ownership</span>
        </div>
        <SelectRouterStaff />
      </div>
      <Fragment>
        <Table>
          <Table.Head>
            <Table.HeadCell>Property ID</Table.HeadCell>
            <Table.HeadCell>Room ID</Table.HeadCell>
            <Table.HeadCell>User ID</Table.HeadCell>
            <Table.HeadCell>Start date</Table.HeadCell>
            <Table.HeadCell>End date</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {ownershipUserList?.content.map((item: any, index: number) => {
              return (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{item.id.propertyId}</Table.Cell>
                  <Table.Cell>{item.id.roomId}</Table.Cell>
                  <Table.Cell>{item.id.userId}</Table.Cell>
                  <Table.Cell>{format(new Date(item.startTime), 'dd-MM-yyyy')}</Table.Cell>
                  <Table.Cell>{format(new Date(item.endTime), 'dd-MM-yyyy')}</Table.Cell>
                  <Table.Cell>{item.type === 'DEEDED' ? 'DEEDED' : 'NOT-DEEDED'}</Table.Cell>
                  <Table.Cell>
                    {item.status === 'ACCEPTED' ? (
                      <div className="py-2 px-1 text-sm text-center  bg-slate-200 rounded-md text-green-500">
                        ACCEPTED
                      </div>
                    ) : (
                      <div className="py-2 px-1 text-center text-sm bg-slate-200 rounded-md text-rose-600">
                        NOT-ACCEPTED
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() =>
                        router.push(
                          `/staff/listapproveOwnership/${item.id.propertyId}/${item.id.userId}/${item.id.roomId}`
                        )
                      }
                      className="text-sky-500 hover:underline cursor-pointer"
                    >
                      View detail
                    </span>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <div className="flex py-5 overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </Fragment>
    </div>
  );
};

export default ListApproveOwnership;
