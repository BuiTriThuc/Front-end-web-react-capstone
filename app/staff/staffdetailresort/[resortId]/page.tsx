import GetResortById from '@/app/actions/getResortById';
import DropDownEditResort from '@/app/components/staff/DropDownEditResort';
import ListActionApproveApartment from '@/app/components/staff/ListActionApproveApartment';
import requireAuth from '@/app/libs/requireAuth';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { AiOutlineCheck, AiOutlineClose, AiTwotoneStar } from 'react-icons/ai';
import { BiDollarCircle, BiMailSend } from 'react-icons/bi';
import { BsCalendarDate, BsClock } from 'react-icons/bs';
import { FaWifi } from 'react-icons/fa6';
import { FiPhoneCall } from 'react-icons/fi';
import { IoIosPeople } from 'react-icons/io';
import { RxRadiobutton } from 'react-icons/rx';
import GoogleMapReact from 'google-map-react-concurrent';
import MapResort from '../MapResort';
import EditResort from './EditResort';

interface IParams {
  resortId: string;
}
export default async function StaffDetailResort({ params }: { params: IParams }) {
  const resortDetail = await GetResortById(params);

  return requireAuth(
    <div>
      <div className="">
        Staff {'>'} <span className="text-common">Detail Resort</span>
      </div>
      <EditResort resortDetail={resortDetail} />
    </div>,
    [3]
  );
}
