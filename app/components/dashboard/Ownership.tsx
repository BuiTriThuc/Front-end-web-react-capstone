'use client';

import useCreateOwnershipModal from '@/app/hooks/useCreateOwnershipModal';
import { format } from 'date-fns';
import { Table } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Pagination } from 'flowbite-react';
import axios from 'axios';
import HeadingDashboard from '../HeadingDashboard';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

const TABLE_HEAD = [
  'Resort',
  'Property',
  'Apartment ID',
  'Start date',
  'End date',
  'Type',
  'Status',
  '',
];

interface OwnershipProps {
  ownershipUser?: any;
  resort?: any;
  currentUser?: any;
}

const Ownership: React.FC<OwnershipProps> = ({ ownershipUser, resort, currentUser }) => {
  const [ownershipUserList, setOwnershipUserList] = useState(ownershipUser);
  const [listResort, setListResort] = useState(resort);
  const router = useRouter();
  const createOwnershipModal = useCreateOwnershipModal();
  const isSuccess = createOwnershipModal.isSuccess;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const onPageChange = (page: number) => setCurrentPage(page);

  const handleRouter = (coOwnerId : any, status: any) => {
    if (status === 'ACCEPTED') {
      router.push(`/dashboard/ownership/${coOwnerId}`);
    } else {
      toast.error('Apartment can only be edited once the status has been updated to ACCEPTED');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      // let apiUrl = `https://holiday-swap.click/api/co-owners?userId=${currentUser?.userId}&pageNo=${
      let apiUrl = `https://holiday-swap.click/api/co-owners?userId=${currentUser?.userId}&pageNo=${
        currentPage - 1
      }&pageSize=10&sortDirection=desc`;

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
    if (ownershipUserList) {
      setTotalPages(ownershipUserList.totalPages);
    }
  }, [ownershipUserList]);

  useEffect(() => {
    fetchData();

    if (isSuccess === true) {
      fetchData();
      createOwnershipModal.onSuccessReset();
    }
  }, [searchTerm, currentPage, isSuccess]);

  return (
    <Fragment>
      <div className="mt-7">
        <HeadingDashboard
          routerDashboard="/dashboard"
          pageCurrentContent="Ownership"
          pageCurrentRouter="/dashboard/ownership"
        />
      </div>
      <div className={`py-6 flex flex-row w-full justify-between`}>
        <div className="flex flex-row items-center gap-2">
          <div>Search by room ID</div>
          <input
            className="rounded-md"
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={() => createOwnershipModal.onOpen(listResort, currentUser)}
          className="bg-common py-3 px-5 rounded-lg shadow-md text-white text-lg hover:bg-hover"
        >
          Create ownership apartment
        </button>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Fragment>
          {ownershipUserList &&
          ownershipUserList?.content &&
          ownershipUserList?.content.length > 0 ? (
            <Table>
              <Table.Head>
                {TABLE_HEAD.map((header, index) => (
                  <Table.HeadCell key={index}>{header}</Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className="divide-y">
                {(ownershipUserList?.content || []).map((item: any, index: number) => {
                  let endYear = new Date(item.endTime).getFullYear();
                  let currentWeekIso = dayjs().isoWeek();
                  let flagTimeFramesCheck = false;
                  item.timeFrames.forEach((element: any) => {
                    if (element.weekNumber > currentWeekIso) flagTimeFramesCheck = true;
                  });

                  return (
                    <>
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell>{item?.property.resort?.resortName}</Table.Cell>
                        <Table.Cell>{item.property.propertyName}</Table.Cell>
                        <Table.Cell className="w-[140px]">{item.roomId}</Table.Cell>
                        <Table.Cell className="w-[120px]">
                          {item.startTime !== null ? format(new Date(item.startTime), 'yyyy') : '-'}
                        </Table.Cell>
                        <Table.Cell className="w-[120px]">
                          {item.endTime !== null ? endYear : '-'}
                        </Table.Cell>
                        <Table.Cell>
                          {item.type === 'DEEDED' ? 'Owner forever' : 'Owner for a period of time'}
                        </Table.Cell>
                        <Table.Cell>
                          {(() => {
                            if (item.status === 'ACCEPTED') {
                              return (
                                <div className="py-2 px-1 text-sm text-center  bg-slate-200 rounded-md text-green-500">
                                  ACCEPTED
                                </div>
                              );
                            } else if (item.status === 'REJECTED') {
                              return (
                                <div className="py-2 px-1 text-sm text-center  bg-slate-200 rounded-md text-red-500">
                                  REJECTED
                                </div>
                              );
                            } else {
                              return (
                                <div className="py-2 px-1 text-sm text-center  bg-slate-200 rounded-md text-orange-500">
                                  PENDING
                                </div>
                              );
                            }
                          })()}
                        </Table.Cell>
                        <Table.Cell>
                          {(() => {
                            if (
                              item.status === 'ACCEPTED' &&
                              item.property.resort.status == 'ACTIVE' &&
                              (item.endTime == null || new Date(item.endTime) > new Date())
                            ) {
                              return (
                                <div
                                  onClick={() =>
                                    handleRouter(
                                      item.id,
                                      item.status
                                    )
                                  }
                                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 hover:cursor-pointer"
                                >
                                  <p>Detail</p>
                                </div>
                              );
                            } else if (item.property.resort.status === 'DEACTIVATE') {
                              return (
                                <div className="font-medium text-red-600">
                                  <p>Resort is Deactive</p>
                                </div>
                              );
                            }
                            if (
                              item.status === 'ACCEPTED' &&
                              item.type === 'RIGHT_TO_USE' &&
                              endYear < new Date().getFullYear()
                            ) {
                              return (
                                <div className="font-medium text-red-600">
                                  <p>Is expired</p>
                                </div>
                              );
                            } else if (
                              item.status === 'ACCEPTED' &&
                              item.type === 'RIGHT_TO_USE' &&
                              endYear == new Date().getFullYear() &&
                              !flagTimeFramesCheck
                            ) {
                              return (
                                <div className="font-medium text-red-600">
                                  <p>Is expired</p>
                                </div>
                              );
                            }
                          })()}
                        </Table.Cell>
                      </Table.Row>
                    </>
                  );
                })}
              </Table.Body>
            </Table>
          ) : (
            <div className="flex flex-row justify-center pt-20 text-xl font-bold">
              Not have ownership
            </div>
          )}
        </Fragment>
      )}
      {ownershipUserList && ownershipUserList?.content && ownershipUserList?.content.length > 0 && (
        <div className="flex py-5 overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      )}
    </Fragment>
  );
};

export default Ownership;
