'use client';

import React from 'react';
import ChartUser from './ChartUser';
import ChartBooking from './ChartBooking';
import ChartIncome from './ChartIncome';
import SelectRouterAdmin from './SelectRouterAdmin';
import ChartBookingYear from './ChartBookingYear';
import ChartIncomeYear from './ChartIncomeYear';
import ChartTotalPoint from './ChartTotalPoint';
import ChartTotalPointYear from './ChartTotalPointYear';
import HeadingDashboard from '../HeadingDashboard';
import { useRouter } from 'next/navigation';

interface DashboardAdminProps {
  listUser: any;
}

const DashBoardAdmin: React.FC<DashboardAdminProps> = ({ listUser }) => {
  const router = useRouter();
  return (
    <div>
      <SelectRouterAdmin />
      <div className="flex flex-row gap-1 items-center py-5">
        <span
          onClick={() => router.push('/admin')}
          className="hover:underline hover:cursor-pointer text-[20px] text-common font-bold"
        >
          Dashboard
        </span>{' '}
      </div>
      <div className="bg-[#F0F4F7] rounded-md w-auto h-auto px-20 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-1 bg-[#FFFFFF] rounded-md shadow-lg">
          <ChartUser listUser={listUser} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
          <div className="bg-white rounded-md shadow-lg">
            <ChartBooking />
          </div>
          <div className="bg-white rounded-md shadow-lg">
            <ChartBookingYear />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 pb-5 gap-6">
          <div className="bg-white rounded-md shadow-lg">
            <ChartIncome />
          </div>
          <div className="bg-white rounded-md shadow-lg">
            <ChartIncomeYear />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5">
          <div className="bg-white rounded-md shadow-lg">
            <ChartTotalPoint />
          </div>
          <div className="bg-white rounded-md shadow-lg">
            <ChartTotalPointYear />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdmin;
