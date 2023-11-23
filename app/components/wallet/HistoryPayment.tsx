'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import { Pagination } from 'flowbite-react';

interface HistoryPaymentProps {
  historyTransaction: any;
}

const HistoryPayment: React.FC<HistoryPaymentProps> = ({ historyTransaction }) => {
  const [value, setValue] = useState('1');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 5; // Số lượng mục trên mỗi trang

  // Tính toán số trang dựa trên số lượng mục và số lượng mục trên mỗi trang
  useEffect(() => {
    if (historyTransaction) {
      setPageCount(Math.ceil(historyTransaction?.length / itemsPerPage));
    }
  }, [historyTransaction]);
  // Hàm xử lý sự kiện khi trang thay đổi
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // Sử dụng `.slice()` để lấy danh sách các mục cần hiển thị trên trang hiện tại
  const displayedItems = historyTransaction?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <TabPanel value="1">
          <div>
            {displayedItems?.map((item: any, index: number) => (
              <div
                key={index}
                className="mb-5 grid grid-cols-5 bg-white shadow-sm  py-1 rounded-3xl w-full"
              >
                <div className="flex flex-row items-center">
                  <img className="w-14 h-14 rounded-full" src="/images/avt.jpg" alt="asd" />
                  <div className="flex flex-col ml-2">
                    <div className="text-2xl font-semibold">{item.to}</div>
                    <div className="text-gray-500">Membership</div>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <div className="mr-2">
                    {format(new Date(item?.dateConvert.split(' ')[0]), 'MMM d yyyy')}
                  </div>
                  <span>{item?.dateConvert.split(' ')[1]} PM</span>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <div>200.000</div>
                </div>
                <div className="flex flex-row items-center">
                  <img className="w-5 h-5 " src="/images/coin.png" alt="" />
                  <div className={item.amount.includes('+') ? 'text-green-500' : 'text-rose-500'}>
                    {item.amount}
                  </div>
                </div>
                <div className="flex flex-row justify-end items-center">
                  <div
                    className={`rounded-3xl px-3 py-2   w-auto h-auto ${
                      item.status === 'SUCCESS' ? ' text-green-700' : ' text-rose-700'
                    }`}
                  >
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Hiển thị phân trang */}
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={pageCount}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </TabPanel>
        {/* Thêm TabPanel cho các tab khác nếu cần */}
      </TabContext>
    </Box>
  );
};

export default HistoryPayment;
