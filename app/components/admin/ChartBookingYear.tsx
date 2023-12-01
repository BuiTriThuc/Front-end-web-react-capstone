'use client';

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { Tooltip as FlowTooltip } from 'flowbite-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBookingYear = () => {
  const ctxLabel = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [type, setType] = useState('current');
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const config = { headers: { 'Content-type': 'application/json' } };
      const body = {
        type: type,
      };
      const data = await axios.post(
        'https://holiday-swap.click/api/v1/reportdashboard/totalbooking/year',
        body,
        config
      );
      const bookingArray = Object.values(data.data);

      setData(bookingArray);
    };
    fetchData();
  }, [type]);

  const handleChangeYear = async (type: any) => {
    const config = { headers: { 'Cotent-type': 'application/json' } };
    const body = {
      year: new Date(data.slice(12, 13)).getFullYear(),
      type: type,
    };
    const dataBooking = await axios.post(
      'https://holiday-swap.click/api/v1/reportdashboard/totalbooking/year',
      body,
      config
    );
    const bookingArray = Object.values(dataBooking.data);

    setData(bookingArray);
  };

  console.log('Check data', type);
  const ctxData1 = [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30];
  const ctxColor1 = '#506fd9';
  const ctxColor2 = '#DBDFFD';

  const dataBar = {
    labels: ctxLabel,
    datasets: [
      {
        data: data?.slice(0, 12),
        backgroundColor: ctxColor1,
        barPercentage: 0.5,
      },
      // {
      //   data: ctxData2,
      //   backgroundColor: ctxColor2,
      //   barPercentage: 0.5,
      // },
    ],
  };

  const optionBar = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };
  return (
    <div className="p-5 w-full flex flex-col items-center">
      <div className="font-bold text-xl text-black">
        Booking in year {data?.slice(12, 13) as string}
      </div>
      <div className="p-4 w-full h-[300px]">
        <Bar data={dataBar} options={optionBar} />
      </div>

      <div className="flex flex-row w-full justify-end gap-3">
        <FlowTooltip content="Prev year">
          <button
            onClick={() => {
              setType('back');
              handleChangeYear(type);
            }}
            type="button"
          >
            <IoIosArrowDropleftCircle color="#FFCA25" size={30} />
          </button>
        </FlowTooltip>

        <FlowTooltip content="Next year">
          <button
            onClick={() => {
              setType('next');
              handleChangeYear(type);
            }}
            type="button"
          >
            <IoIosArrowDroprightCircle color="#5C98F2" size={30} />
          </button>
        </FlowTooltip>
      </div>
    </div>
  );
};

export default ChartBookingYear;
