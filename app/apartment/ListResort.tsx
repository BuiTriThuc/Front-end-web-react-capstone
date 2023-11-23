'use client';

import React, { Fragment, useEffect, useRef, useState } from 'react';
import CardListResort from '../components/listResort/CardListResort';
import axios from 'axios';
import { Pagination } from 'flowbite-react';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';

interface ListResortProps {
  listApartment: any;
  resortId: any;
  dateRange: any;
  numberOfGuest: any;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 100000000),
  key: 'selection',
};

const ListResort: React.FC<ListResortProps> = ({
  listApartment,
  resortId,
  dateRange,
  numberOfGuest,
}) => {
  const [page, setPage] = useState<number>(1);
  const [listResort, setListResort] = useState<any>(listApartment);
  const [resortIdValue, setResortIdValue] = useState(resortId);
  const [numberOfGuestValue, setNumberOfGuestValue] = useState(numberOfGuest);
  const [initialDate, setInitialDate] = useState(initialDateRange);
  const [dateRangeNew, setDateRangeNew] = useState<any>(dateRange);
  const [totalPages, setTotalPages] = useState<any>(listApartment.totalPages);

  const searchParams = useSearchParams();
  const resortIdParams = searchParams?.get('resortId');
  const dateRangeParamsSearch = searchParams?.get('dateRange');
  let dateRangeParams: any;
  const numberOfGuestParams = searchParams?.get('numberOfGuest');

  useEffect(() => {
    setDateRangeNew(dateRange);

    if (dateRangeParamsSearch) {
      dateRangeParams = JSON.parse(searchParams?.get('dateRange') ?? '');
    }
  }, [dateRange, dateRangeParamsSearch]);

  useEffect(() => {
    setDateRangeNew(dateRangeParams);
    setResortIdValue(resortIdParams);
    setNumberOfGuestValue(numberOfGuestParams);
  }, [resortIdParams, dateRangeParams, numberOfGuestParams]);

  useEffect(() => {
    const getList = async () => {
      if (resortIdValue && numberOfGuestValue) {
        let apiUrl = `https://holiday-swap.click/api/v1/apartment-for-rent?min=0&max=1000000&pageNo=${
          page - 1
        }&guest=${numberOfGuestValue}&resortId=${resortIdValue}&pageSize=12&sortBy=id`;

        if (
          dateRangeNew &&
          dateRangeNew.endDate.toDateString() !== initialDate.endDate.toDateString()
        ) {
          apiUrl += `&checkIn=${format(dateRangeNew.startDate, 'yyyy-MM-dd')}&checkOut=${format(
            dateRangeNew.endDate,
            'yyyy-MM-dd'
          )}`;
        }

        const list = await axios.get(apiUrl);
        setListResort(list.data);
        setTotalPages(list.data?.totalPages);
      } else {
        let apiUrl = `https://holiday-swap.click/api/v1/apartment-for-rent?min=0&max=1000000&pageNo=${
          page - 1
        }&pageSize=12&sortBy=id`;

        if (dateRangeNew && dateRangeNew.endDate !== initialDate.endDate) {
          apiUrl += `&checkIn=${format(
            new Date(dateRangeNew.startDate),
            'yyyy-MM-dd'
          )}&checkOut=${format(new Date(dateRangeNew.endDate), 'yyyy-MM-dd')}`;
        }

        const list = await axios.get(apiUrl);
        setListResort(list.data);
        setTotalPages(list.data?.totalPages);
      }
    };

    getList();
  }, [page, numberOfGuest, resortId, dateRangeNew, initialDate, numberOfGuestValue, resortIdValue]);

  console.log('Check date range new', dateRangeNew);

  return (
    <Fragment>
      <div className="bg-white px-[20px] flex flex-col items-center justify-center xl:px-[50px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-5 py-[30px] w-full">
          {listResort && listResort.content.length > 0 ? (
            listResort?.content?.map((item: any, index: number) => (
              <CardListResort key={index} data={item} />
            ))
          ) : (
            <div className="w-full h-full text-3xl font-bold">Not have apartment</div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mb-7">
        {listResort && listResort.content.length > 0 ? (
          <Pagination
            currentPage={page}
            onPageChange={(page: number) => {
              setPage(page);
            }}
            showIcons
            totalPages={totalPages}
          />
        ) : (
          ''
        )}
      </div>
    </Fragment>
  );
};

export default ListResort;
