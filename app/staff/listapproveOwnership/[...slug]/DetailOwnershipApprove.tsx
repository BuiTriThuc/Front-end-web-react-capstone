'use client';

import React, { Fragment, useState } from 'react';
import { format } from 'date-fns';
import { BsCheck2Circle } from 'react-icons/bs';
import { BiBlock } from 'react-icons/bi';
import { MdOutlinePending } from 'react-icons/md';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Image } from 'antd';
import { useRouter } from 'next/navigation';

interface DetailOwnershipApproveProps {
  approveDetail: any;
  propertyDetail: any;
  userDetail: any;
}

const statusList = [
  {
    status: 'ACCEPTED',
    icon: BsCheck2Circle,
    color: '#2fde26',
  },
  {
    status: 'REJECTED',
    icon: BiBlock,
    color: '#e62538',
  },
  {
    status: 'PENDING',
    icon: MdOutlinePending,
    color: '#e06d14',
  },
];

const DetailOwnershipApprove: React.FC<DetailOwnershipApproveProps> = ({
  approveDetail,
  propertyDetail,
  userDetail,
}) => {
  const [detail, setDetail] = useState(approveDetail);
  const axiosAuthClient = useAxiosAuthClient();
  const router = useRouter();

  const handleOnChangeStatus = (propertyId: any, userId: any, roomId: any, value: any) => {
    const body = value;
    const config = {
      headers: { 'Content-type': 'application/json' },
    };

    axiosAuthClient
      .put(
        `https://holiday-swap.click/api/co-owners/status?propertyId=${propertyId}&userId=${userId}&roomId=${roomId}&coOwnerStatus=${value}`,
        body,
        config
      )
      .then(async () => {
        toast.success('Update status success');
        const newDetail = await axios.get(
          `https://holiday-swap.click/api/co-owners/detail?propertyId=${propertyId}&userId=${userId}&roomId=${roomId}`
        );

        if (newDetail) {
          setDetail(newDetail.data);
        }

        // Redirect to /staff/listapproveOwnership after successful update
        router.push('/staff/listapproveOwnership');
      })
      .catch((response) => {
        toast.error(response.response.data.message);
      });
  };
  return (
    <div>
      <div>
        <div>
          Staff {'> '}
          <span>
            List Approve Ownership {'>'} <span className="text-common">Detail</span>
          </span>
        </div>
      </div>
      <Image.PreviewGroup>
        <div className="grid grid-cols-2 mt-10 gap-5">
          <div className="w-full">
            <div className="flex flex-row gap-3">
              {detail.contractImages.length === 1 ? (
                <Fragment>
                  {detail.contractImages.map((item: any, index: number) => (
                    <Image
                      key={item.id}
                      src={item.link}
                      width="100%"
                      height={500}
                      alt="contract image"
                    />
                  ))}
                </Fragment>
              ) : (
                <Fragment>
                  {detail.contractImages.map((item: any, index: number) => (
                    <Image
                      key={item.id}
                      src={item.link}
                      width={200}
                      height={200}
                      alt="contract image"
                    />
                  ))}
                </Fragment>
              )}
              {}
            </div>
          </div>
          <div className="w-full sticky">
            <div className="flex flex-col gap-5 sticky top-36 w-full p-6 rounded-lg bg-gray-300">
              <div className="grid grid-cols-2 ">
                <div className="text-black mb-5">
                  Property: <span className="text-slate-600">{propertyDetail?.propertyName}</span>
                </div>
                <div className="text-black">
                  User<span className="text-slate-600">{userDetail?.username}</span>
                </div>
                <div className="text-black">
                  Apartment ID: <span className="text-slate-600">{detail.id.roomId}</span>
                </div>
              </div>

              <div className="">
                <div className="text-black">
                  Type:{' '}
                  <span
                    className={`${
                      detail.type === 'RIGHT_TO_USE' ? ' text-orange-600' : 'text-green-600'
                    }`}
                  >
                    {detail.type === 'RIGHT_TO_USE'
                      ? 'Owner for a period of time'
                      : 'Owner forever'}
                  </span>
                </div>
              </div>

              {detail.type === 'RIGHT_TO_USE' && (
                <div className="grid grid-cols-2">
                  <div className="text-black">
                    Start time:{' '}
                    <span className="text-slate-600">
                      {format(new Date(detail.startTime), 'dd/MM/yyyy')}
                    </span>
                  </div>
                  <div className="text-black">
                    End Time:{' '}
                    <span className="text-slate-600">
                      {format(new Date(detail.endTime), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>
              )}

              <div className="">
                <div className="text-black">
                  Number of weeks in a year:{' '}
                  <span className="text-slate-600">
                    {detail.timeFrames.map((item: any, index: number) => (
                      <span key={item.id}>{item.weekNumber}</span>
                    ))}
                  </span>
                </div>
              </div>

              <div className="">
                <div className="text-black">
                  Status:{' '}
                  <span
                    className={`${
                      detail.status === 'PENDING' ? ' text-orange-600' : 'text-green-600'
                    } ${detail.status === 'REJECTED' ? ' text-rose-600' : ''}`}
                  >
                    {(() => {
                      if (detail.status === 'ACCEPTED') {
                        return 'ACCEPTED';
                      } else if (detail.status === 'PENDING') {
                        return 'PENDING';
                      } else if (detail.status === 'REJECTED') {
                        return 'REJECTED';
                      }
                    })()}
                  </span>
                </div>
              </div>

              {detail.status !== 'ACCEPTED' && detail.status !== 'REJECTED' && (
                <div className="flex flex-end justify-end items-center gap-5">
                  <button
                    onClick={() =>
                      handleOnChangeStatus(
                        detail.id.propertyId,
                        detail.id.userId,
                        detail.id.roomId,
                        'ACCEPTED'
                      )
                    }
                    className="bg-common hover:bg-hover p-3 text-white text-center font-bold rounded-lg shadow-md"
                  >
                    ACCEPTED
                  </button>
                  <button
                    onClick={() =>
                      handleOnChangeStatus(
                        detail.id.propertyId,
                        detail.id.userId,
                        detail.id.roomId,
                        'REJECTED'
                      )
                    }
                    className="bg-rose-400 hover:bg-rose-500 p-3 text-white text-center font-bold rounded-lg shadow-md"
                  >
                    REJECTED
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Image.PreviewGroup>
    </div>
  );
};

export default DetailOwnershipApprove;
