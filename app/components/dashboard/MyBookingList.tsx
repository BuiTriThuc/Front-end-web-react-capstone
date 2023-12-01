'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { differenceInDays, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import HeadingDashboard from '../HeadingDashboard';
import { Fragment } from 'react';
import { Pagination } from 'flowbite-react';

interface MyBookingListProps {
  historyBooking: any;
}

const MyBookingList: React.FC<MyBookingListProps> = ({ historyBooking }) => {
  const router = useRouter();
  const calculateNightDifference = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nightDifference = differenceInDays(end, start);
    return nightDifference;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 10; // Số lượng mục trên mỗi trang
  const [displayedItems, setDisplayItems] = useState<any>();

  // Tính toán số trang dựa trên số lượng mục và số lượng mục trên mỗi trang
  useEffect(() => {
    if (historyBooking) {
      setPageCount(Math.ceil(historyBooking?.length / itemsPerPage));
    }
  }, [historyBooking]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayItems(historyBooking?.slice(startIndex, endIndex));
  }, [currentPage, historyBooking, itemsPerPage]);

  // Hàm xử lý sự kiện khi trang thay đổi
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // Sử dụng `.slice()` để lấy danh sách các mục cần hiển thị trên trang hiện tại

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <Fragment>
      <div className="mt-12">
        <HeadingDashboard
          routerDashboard="/dashboard"
          pageCurrentContent="My booking"
          pageCurrentRouter="/dashboard/myBooking"
        />
      </div>
      <div className="py-6">
        {displayedItems?.length > 0 ? (
          displayedItems.reverse().map((item: any) => (
            <div
              onClick={() => router.push(`/dashboard/myBooking/${item.bookingId}`)}
              key={item.bookingId}
              className="grid grid-cols-12 h-[150px] bg-white rounded-lg shadow-lg justify-between hover:cursor-pointer mb-5"
            >
              <div className="col-span-9">
                <div className="grid grid-cols-9 h-full gap-5">
                  <div className="col-span-3 w-full h-full relative rounded-lg">
                    <Image
                      src={item.propertyImage}
                      fill
                      alt="image"
                      className="w-full object-cover rounded-tl-md rounded-bl-md"
                    />
                  </div>
                  <div className="col-span-6 flex flex-col">
                    <div className="py-2">
                      <div className="text-xs text-gray-700">{item.resortName}</div>
                      <div className="text-lg font-bold ">{item.propertyName}</div>
                    </div>
                    <div className="text-base text-gray-700">
                      {format(new Date(item.checkInDate), 'dd, MMM yyyy')} -{' '}
                      {format(new Date(item.checkOutDate), 'dd, MMM yyyy')}
                    </div>
                    <div className="text-base text-gray-700">
                      Number of nights:{' '}
                      {calculateNightDifference(item.checkInDate, item.checkOutDate)}
                    </div>
                    <div className="text-base text-gray-700">
                      Total: <span className="text-black">{item.price} point</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-3 flex flex-row justify-center items-center">
                <div className="text-lg text-green-600">{item.status}</div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="text-[30px]">My booking</div>
            <div className="w-full h-[1px] bg-gray-300 my-8"></div>
            <div className="text-[25px] font-bold">No apartments booked....Not yet!</div>
            <div className="py-5 text-gray-700">
              It&apos;s time to dust off your bags and start planning for your next adventure
            </div>
            <button className="border border-gray-500 rounded-md px-10 py-3 hover:bg-gray-100">
              Start searching
            </button>
          </div>
        )}
      </div>

      {historyBooking?.length > itemsPerPage && (
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

export default MyBookingList;
