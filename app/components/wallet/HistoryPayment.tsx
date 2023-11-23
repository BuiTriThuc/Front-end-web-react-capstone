'use client';
import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import { Pagination, Table } from 'flowbite-react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface HistoryPaymentProps {
  historyTransaction: any;
}

const HistoryPayment: React.FC<HistoryPaymentProps> = ({ historyTransaction }) => {
  const [value, setValue] = useState('1');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 5; // Số lượng mục trên mỗi trang
  const [displayedItems, setDisplayItems] = useState<any>();

  // Tính toán số trang dựa trên số lượng mục và số lượng mục trên mỗi trang
  useEffect(() => {
    if (historyTransaction) {
      setPageCount(Math.floor(historyTransaction?.length / itemsPerPage));
    }
  }, [historyTransaction]);

  useEffect(() => {
    setDisplayItems(
      historyTransaction?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    );
  }, [currentPage]);

  // Hàm xử lý sự kiện khi trang thay đổi
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // Sử dụng `.slice()` để lấy danh sách các mục cần hiển thị trên trang hiện tại

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <Fragment>
      <Table>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {displayedItems?.map((item: any, index: number) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <div className="flex flex-col text-base">
                  <div>{format(new Date(item.createdOn), 'dd')}</div>
                  <div>{format(new Date(item.createdOn), 'MMM, yyyy')}</div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex flex-col">
                  <div className="text-gray-900 text-base font-bold">
                    {item.type === 'RECIVED'
                      ? `From: ${item.from === 'VN_PAY' ? 'Top up your wallet' : item.from}`
                      : `To: ${item.to}`}
                  </div>
                  <div className="text-gray-600 text-sm">{item.message}</div>
                </div>
              </Table.Cell>
              <Table.Cell>
                {item.status === 'SUCCESS' ? (
                  <FaCheckCircle size={30} color="green" />
                ) : (
                  <FaTimesCircle size={30} color="red" />
                )}
              </Table.Cell>
              <Table.Cell className="text-gray-900 text-lg">
                <div
                  className={`font-bold ${
                    (item.amount as string).includes('+') ? 'text-green-600' : ''
                  }`}
                >
                  {item.amount}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {historyTransaction?.length > itemsPerPage && (
        <div className="flex justify-center py-3">
          <Pagination
            currentPage={currentPage}
            totalPages={pageCount}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      )}
    </Fragment>
  );
};

export default HistoryPayment;
