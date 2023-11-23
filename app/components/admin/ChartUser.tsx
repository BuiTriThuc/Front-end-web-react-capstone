'use client';

import React, { useState } from 'react';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartUserProps {
  listUser: any;
}

const ChartUser: React.FC<ChartUserProps> = ({ listUser }) => {
  const [listUserData, setListUserData] = useState(listUser?.content);

  const numberOfAdmin = listUserData.filter((admin: any) => admin.role.roleId === 1).length;
  const numberOfMembership = listUserData.filter(
    (membership: any) => membership.role.roleId === 2
  ).length;
  const numberOfStaff = listUserData.filter((staff: any) => staff.role.roleId === 3).length;
  const numberOfGuest = listUserData.filter((guest: any) => guest.role.roleId === 4).length;
  const data = {
    labels: ['Admin', 'Membership', 'Guest', 'Staff'],
    datasets: [
      {
        data: [numberOfAdmin, numberOfMembership, numberOfStaff, numberOfGuest],
        backgroundColor: ['aqua', 'bloodorange', 'purple', 'green'],
      },
    ],
  };

  return (
    <div className="p-5 w-full flex flex-col items-center">
      <div className="font-bold text-xl text-black">Users in system</div>
      <div className="">
        <Pie data={data}></Pie>
      </div>
    </div>
  );
};

export default ChartUser;
