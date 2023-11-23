'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Pagination } from 'antd';
import SelectRouterStaff from './SelectRouterStaff';
export default function ListProperty() {
  const resortsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const ListResort = [
    {
      id: 1,
      name: 'Resort 1',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
    {
      id: 2,
      name: 'Resort 2',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 2 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
    {
      id: 3,
      name: 'Resort 3',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 3 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
    {
      id: 4,
      name: 'Resort 4',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 4 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
    {
      id: 5,
      name: 'Resort 4',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 4 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
    {
      id: 6,
      name: 'Resort 4',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 4 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
    {
      id: 7,
      name: 'Resort 4',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 4 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
    {
      id: 8,
      name: 'Resort 4',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 4 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
    {
      id: 9,
      name: 'Resort 4',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 4 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
    {
      id: 10,
      name: 'Resort 4',
      des: ' Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 4 Đây là đoạn mô tả của resort 1 Đây là đoạn mô tả của resort 1',
      button: 'View more',
    },
  ];
  const indexOfLastResort = currentPage * resortsPerPage;
  const indexOfFirstResort = indexOfLastResort - resortsPerPage;
  const currentResorts = ListResort.slice(indexOfFirstResort, indexOfLastResort);

  const totalPages = Math.ceil(ListResort.length / resortsPerPage);

  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="mt-8 mb-10">
        <div>
          Staff {'> '}
          <span className="text-common">List property</span>
        </div>
      </div>
      <SelectRouterStaff />
      <div className="grid grid-cols-3 gap-5">
        {currentResorts.map((resort) => (
          <div
            key={resort.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-5">
              <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {resort.name}
              </div>
              <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">{resort.des}</div>
              <Link
                href="./listpropertyinresort"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {resort.button}
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center">
        <ul className="flex items-center">
          <li
            className={`mr-2 ${currentPage === 1 ? 'hidden' : 'text-blue-700 hover:text-blue-900'}`}
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              className="focus:outline-none  bg-common rounded-md px-5 py-2 text-white hover:bg-blue-600"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`mr-2 ${
                currentPage === index + 1
                  ? 'text-blue-700 font-bold'
                  : 'text-gray-600 hover:text-blue-700'
              }`}
            >
              <button onClick={() => paginate(index + 1)} className="focus:outline-none">
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`ml-2 ${
              currentPage === totalPages ? 'hidden' : 'text-blue-700 hover:text-blue-900'
            }`}
          >
            <button
              onClick={() => paginate(currentPage + 1)}
              className="focus:outline-none bg-common rounded-md px-5 py-2 text-white hover:bg-blue-600"
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
