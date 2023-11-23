import ApartmentOfMembership from '@/app/components/staff/ApartmentOfMembership';
import DropDownBanMember from '@/app/components/staff/DropDownBanMember';
import requireAuth from '@/app/libs/requireAuth';
import Link from 'next/link';
import React from 'react';

export default function EditMembership() {
  return requireAuth(
    <div>
      <div className="bg-gray-200 w-auto h-auto rounded-lg px-20 pt-14">
        <div>
          <div className="flex flex-row justify-between items-center pb-10">
            <div className="text-[20px] font-bold text-common">Membership Profile</div>

            <DropDownBanMember />
          </div>
          <div className="flex flex-row">
            <img className="rounded-full w-24 h-24 mr-10" src="/images/resort1.jpg" alt="" />
            <div className="flex flex-row mb-14 ">
              <div className="flex flex-col mr-10 text-gray-400 ">
                <div className="mb-5">Name</div>
                <div className="mb-5">Birth Date</div>
                <div className="mb-5">Email</div>
              </div>
              <div className="flex flex-col mr-16 text-gray-600 ">
                <div className="mb-5 ml-9">Thuc Bui</div>
                <div className="mb-5 ml-9">March 10, 2001</div>
                <div className="mb-5 ml-9">buitrithuc1008@gmail.com</div>
              </div>
              <div className="flex flex-col mr-10 text-gray-400 ">
                <div className="mb-5 ml-9">Gender</div>
                <div className="mb-5 ml-9"> Country</div>
                <div className="mb-5 ml-9"> Phone</div>
              </div>
              <div className="flex flex-col text-gray-600 ">
                <div className="mb-5 ml-9">Male</div>
                <div className="mb-5 ml-9">VietNam</div>
                <div className="mb-5 ml-9">0856597778</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApartmentOfMembership />
    </div>,
    [3]
  );
}
