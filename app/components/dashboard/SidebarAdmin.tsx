'use client';

import React, { useState } from 'react';
import { GrPersonalComputer, GrSecure } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { PiNotepadBold } from 'react-icons/pi';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { AiOutlineStar, AiFillPieChart } from 'react-icons/ai';
import { FiUserPlus } from 'react-icons/fi';
import { MdOutlineSwapHorizontalCircle, MdBusinessCenter } from 'react-icons/md';
import { BiSolidCoin } from 'react-icons/bi';
import { GrBusinessService } from 'react-icons/gr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const SidebarAdmin = () => {
  const pathName = usePathname();
  const sidebarMyaccount = [
    {
      name: 'Report',
      href: '/admin',
      icon: AiFillPieChart,
      current: pathName === '/admin' ? true : false,
    },
  ];
  const sidebarBooking = [
    {
      name: 'List Staff',
      href: '/admin/liststaff',
      icon: PiNotepadBold,
      current: pathName?.includes('/admin/liststaff') ? true : false,
    },
    {
      name: 'Create Staff',
      href: '/admin/createstaff',
      icon: FiUserPlus,
      current: pathName?.includes('/admin/createstaff') ? true : false,
    },
    {
      name: 'Point',
      href: '/admin/point',
      icon: BiSolidCoin,
      current: pathName?.includes('/admin/point') ? true : false,
    },
    {
      name: 'Plan',
      href: '/admin/plan',
      icon: MdBusinessCenter,
      current: pathName?.includes('/admin/plan') ? true : false,
    },
  ];
  const sidebarExchange = [
    {
      name: 'List Approve',
      href: '/staff/listapprove',
      icon: MdOutlineSwapHorizontalCircle,
      current: pathName?.includes('/staff/listapprove') ? true : false,
    },
    {
      name: 'Infomation',
      href: '/staff/infomation',
      icon: LiaFileInvoiceDollarSolid,
      current: pathName?.includes('/staff/infomation') ? true : false,
    },
  ];
  return (
    <div className="pt-[20px] pl-5 pr-5">
      <div className="hidden lg:flex lg:min-h-full lg:rounded-md lg:w-72 lg:flex-col h-full">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#F8F8F8] px-6 pb-4 border-r-2">
          <div className="flex h-16 shrink-0 items-center">
            <div className="text-3xl font-bold text-gray-700">Statistic</div>
          </div>

          <div className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {sidebarMyaccount.map((option) => (
                    <li key={option.name}>
                      <Link
                        href={option.href}
                        className={classNames(
                          option.current
                            ? 'bg-common text-white'
                            : 'text-gray-400 hover:text-white hover:bg-common',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <option.icon className="text-gray-300 group-hover:text-white h-6 w-6 shrink-0" />
                        {option.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex h-16 shrink-0 items-center">
            <div className="text-3xl font-bold text-gray-700">Management</div>
          </div>
          <div className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {sidebarBooking.map((option) => (
                    <li key={option.name}>
                      <Link
                        href={option.href}
                        className={classNames(
                          option.current
                            ? 'bg-common text-white'
                            : 'text-gray-400 hover:text-white hover:bg-common',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <option.icon className="text-gray-300 group-hover:text-white h-6 w-6 shrink-0" />
                        {option.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          {/* <div className="flex h-16 shrink-0 items-center">
            <div className="text-3xl font-bold text-gray-700">Approve</div>
          </div>
          <div className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {sidebarExchange.map((option) => (
                    <li key={option.name}>
                      <Link
                        href={option.href}
                        className={classNames(
                          option.current
                            ? "bg-common text-white"
                            : "text-gray-400 hover:text-white hover:bg-common",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <option.icon className="text-gray-300 group-hover:text-white h-6 w-6 shrink-0" />
                        {option.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div> */}
          <div>
            <button className="bg-[#5C98F2] px-4 py-3 rounded-md text-white">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
