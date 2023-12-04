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
import HeadingDashboard from '../HeadingDashboard';

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
      }&pageSize=8&sortDirection=desc`;

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
  }, [searchTerm, currentPage, totalPages]);

  return (
    <div>
      <div className=" mb-10 mt-2">
        <HeadingDashboard
          routerDashboard="/staff"
          pageCurrentContent="List approve ownership"
          pageCurrentRouter="/staff/listapproveOwnership"
        />
        <SelectRouterStaff />
      </div>
      <Fragment>
        <div className="flex flex-row items-center gap-2 pb-5">
          <div>Search by room ID</div>
          <input
            className="rounded-md"
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell className="w-[130px]">Property ID</Table.HeadCell>
            <Table.HeadCell className="w-[100px]">Room ID</Table.HeadCell>
            <Table.HeadCell className="w-[100px]">User ID</Table.HeadCell>
            <Table.HeadCell>Start date</Table.HeadCell>
            <Table.HeadCell>End date</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell className="w-[130px]">Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {ownershipUserList?.content.map((item: any, index: number) => {
              return (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{item.id.propertyId}</Table.Cell>
                  <Table.Cell>{item.id.roomId}</Table.Cell>
                  <Table.Cell>{item.id.userId}</Table.Cell>
                  <Table.Cell>
                    {item.startTime === null
                      ? 'Owner forever'
                      : `${format(new Date(item.startTime), 'dd-MM-yyyy')}`}
                  </Table.Cell>
                  <Table.Cell>
                    {item.endTime === null
                      ? 'Owner forever'
                      : `${format(new Date(item.endTime), 'dd-MM-yyyy')}`}
                  </Table.Cell>
                  <Table.Cell>
                    {item.type === 'DEEDED' ? 'Owner forever' : 'Owner a previod time'}
                  </Table.Cell>
                  <Table.Cell>
                    {(() => {
                      if (item.status === 'ACCEPTED') {
                        return (
                          <div className="py-2 px-1 text-sm text-center  bg-slate-200 rounded-md text-green-500">
                            ACCEPTED
                          </div>
                        );
                      } else if (item.status === 'PENDING') {
                        return (
                          <div className="py-2 px-1 text-center text-sm bg-slate-200 rounded-md text-orange-600">
                            PENDING
                          </div>
                        );
                      } else if (item.status === 'REJECTED') {
                        return (
                          <div className="py-2 px-1 text-center text-sm bg-slate-200 rounded-md text-rose-600">
                            REJECTED
                          </div>
                        );
                      }
                    })()}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() =>
                        router.push(
                          `/staff/listapproveOwnership/${item.id.propertyId}/${item.id.userId}/${item.id.roomId}`
                        )
                      }
                      className="text-sky-500 hover:underline cursor-pointer "
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
