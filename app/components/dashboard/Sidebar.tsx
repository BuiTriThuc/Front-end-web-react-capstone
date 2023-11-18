'use client';

import React, { useState } from 'react';
import { GrPersonalComputer, GrSecure } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { PiNotepadBold } from 'react-icons/pi';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { AiOutlineStar, AiOutlineHome, AiOutlineUnlock } from 'react-icons/ai';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { MdComputer, MdOutlineSwapHorizontalCircle } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiMessageDetail, BiSolidNotification, BiWallet } from 'react-icons/bi';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = () => {
  const pathName = usePathname();
  const sidebarMyaccount = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: MdComputer,
      current: pathName === '/dashboard' ? true : false,
    },
    {
      name: 'Edit Profile',
      href: '/dashboard/editProfile',
      icon: FiEdit,
      current: pathName === '/dashboard/editProfile' ? true : false,
    },
    {
      name: 'Change password',
      href: '/dashboard/changePassword',
      icon: AiOutlineUnlock,
      current: pathName === '/dashboard/changePassword' ? true : false,
    },
    {
      name: 'Ownership',
      href: '/dashboard/ownership',
      icon: AiOutlineHome,
      current: pathName === '/dashboard/ownership' ? true : false,
    },
  ];

  const sidebarWallet = [
    {
      name: 'My wallet',
      href: '/dashboard/wallet',
      icon: BiWallet,
      current: pathName === '/dashboard/wallet' ? true : false,
    },
    {
      name: 'Transfer',
      href: '/dashboard/transfer',
      icon: BiWallet,
      current: pathName === '/dashboard/transfer' ? true : false,
    },
  ];
  const sidebarBooking = [
    {
      name: 'My Booking',
      href: '/dashboard/myBooking',
      icon: PiNotepadBold,
      current: pathName === '/dashboard/myBooking' ? true : false,
    },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
      icon: LiaFileInvoiceDollarSolid,
      current: pathName === '/dashboard/invoices' ? true : false,
    },
    {
      name: 'Reviews',
      href: '/dashboard/review',
      icon: AiOutlineStar,
      current: pathName === '/dashboard/review' ? true : false,
    },
  ];
  const sidebarExchange = [
    {
      name: 'My Exchange',
      href: '/dashboard/myExchange',
      icon: MdOutlineSwapHorizontalCircle,
      current: pathName === '/dashboard/myExchange' ? true : false,
    },
    {
      name: 'Invoices Exchange',
      href: '/dashboard/invoiceExchange',
      icon: LiaFileInvoiceDollarSolid,
      current: pathName === '/dashboard/invoiceExchange' ? true : false,
    },
    {
      name: 'Reviews Exchange',
      href: '/dashboard/reviewExchange',
      icon: AiOutlineStar,
      current: pathName === '/dashboard/reviewExchange' ? true : false,
    },
  ];

  const sidebarMessages = [
    {
      name: 'Chats',
      href: '/chat',
      icon: BiMessageDetail,
      current: pathName === '/dashboard/chat' ? true : false,
    },
    {
      name: 'Notifications',
      href: '/dashboard/invoiceExchange',
      icon: BiSolidNotification,
      current: pathName === '/dashboard/invoiceExchange' ? true : false,
    }
  ];

  return (
    <div className="pt-5 pl-5 pr-5">
      <div className="hidden lg:flex lg:min-h-full lg:rounded-md lg:w-72 lg:flex-col h-full">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#F8F8F8] px-6 pb-4 border-r-2">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-3xl font-bold text-gray-700">My Account</h1>
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
            <h1 className="text-3xl font-bold text-gray-700">My Wallet</h1>
          </div>

          <div className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {sidebarWallet.map((option) => (
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
            <h1 className="text-3xl font-bold text-gray-700">Booking</h1>
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
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-3xl font-bold text-gray-700">Exchange</h1>
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
            <h1 className="text-3xl font-bold text-gray-700">Messages</h1>
          </div>
          <div className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {sidebarMessages.map((option) => (
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
          <div>
            <button className="bg-[#5C98F2] px-4 py-3 rounded-md text-white">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
