'use client';

import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { PiFolders, PiNotepadBold } from 'react-icons/pi';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { IoCreateOutline } from 'react-icons/io5';
import {
  MdOutlineSwapHorizontalCircle,
  MdComputer,
  MdOutlineCreateNewFolder,
} from 'react-icons/md';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LuArrowUpSquare } from 'react-icons/lu';
import { BsHouseAdd, BsHouseAddFill, BsHouses } from 'react-icons/bs';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const SidebarStaff = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handelSignOut = () => {
    router.push('/');
    signOut();
  };
  const sidebarMyaccount = [
    {
      name: 'Dashboard',
      href: '/staff',
      icon: MdComputer,
      current: pathName === '/staff' ? true : false,
    },
    {
      name: 'List Resort',
      href: '/staff/listresort',
      icon: BsHouses,
      current: pathName?.includes('/staff/listresort') ? true : false,
    },
    {
      name: 'Create Resort',
      href: '/staff/createresort',
      icon: BsHouseAdd,
      current: pathName?.includes('/staff/createresort') ? true : false,
    },
    {
      name: 'List Property',
      href: '/staff/listproperty',
      icon: PiFolders,
      current: pathName?.includes('/staff/listproperty') ? true : false,
    },
    {
      name: 'Create Property',
      href: '/staff/createproperty',
      icon: MdOutlineCreateNewFolder,
      current: pathName?.includes('/staff/createproperty') ? true : false,
    },
  ];
  const sidebarMember = [
    {
      name: 'List Membership',
      href: '/staff/listmember',
      icon: PiNotepadBold,
      current: pathName?.includes('/staff/listmember') ? true : false,
    },
    {
      name: 'Upgrade Member',
      href: '/staff/upgrademembership',
      icon: LuArrowUpSquare,
      current: pathName?.includes('/staff/upgrademembership') ? true : false,
    },
  ];
  const sidebarExchange = [
    {
      name: 'List Approve Ownership',
      href: '/staff/listapproveOwnership',
      icon: MdOutlineSwapHorizontalCircle,
      current: pathName?.includes('/staff/listapproveOwnership') ? true : false,
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
            <div className="text-3xl font-bold text-gray-700">Resort</div>
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
            <div className="text-3xl font-bold text-gray-700">Member</div>
          </div>
          <div className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {sidebarMember.map((option) => (
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
            <button
              onClick={handelSignOut}
              className="bg-[#5C98F2] px-4 py-3 rounded-md text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarStaff;
