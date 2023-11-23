'use client';

import useAparmentAmenitiesModal from '@/app/hooks/useApartmentAmenitiesModal';
import React from 'react';
import ModalBaseDetail from './ModalBaseDetail';
import Image from 'next/image';
import useAparmentReviewModal from '@/app/hooks/useApartmentReviewModal';
import { AiFillStar } from 'react-icons/ai';
import { Progress } from 'antd';
import ApartmentReivewBoxModal from './ApartmentReviewBoxModal';

const ModalApartmentReview = () => {
  const apartmentReviewModal = useAparmentReviewModal();
  const rating = apartmentReviewModal.rating;
  const apartment = apartmentReviewModal.apartment;

  const percenFiveStar = Number(
    (rating?.content.filter((item: any) => item.rating === 5).length / rating?.content.length) * 100
  );
  const percenFourStar = Number(
    (rating?.content.filter((item: any) => item.rating === 4).length / rating?.content.length) * 100
  );
  const percenThreeStar = Number(
    (rating?.content.filter((item: any) => item.rating === 3).length / rating?.content.length) * 100
  );
  const percenTwoStar = Number(
    (rating?.content.filter((item: any) => item.rating === 2).length / rating?.content.length) * 100
  );
  const percenOneStar = Number(
    (rating?.content.filter((item: any) => item.rating === 1).length / rating?.content.length) * 100
  );

  const bodyContent = (
    <div className="grid grid-cols-6 gap-5">
      {/* Overall rating */}
      <div className="col-span-2">
        <div className="flex flex-row items-center gap-3">
          <AiFillStar size={50} color="orange" />
          <div className="text-3xl font-bold">
            {apartment?.property?.rating.toFixed(2)} · {rating?.content.length} reviews
          </div>
        </div>

        <div className="pt-12 flex flex-col gap-2">
          <div className="text-sm">Overall rating</div>
          <div className="flex flex-col">
            <div className="flex flex-col w-full">
              <div className="flex flex-row gap-2">
                <div className="w-2">5</div>
                <Progress
                  percent={percenFiveStar}
                  showInfo={false}
                  size="small"
                  strokeColor="orange"
                />
              </div>

              <div className="flex flex-row gap-2">
                <div className="w-2">4</div>
                <Progress
                  percent={percenFourStar}
                  showInfo={false}
                  size="small"
                  strokeColor="orange"
                />
              </div>

              <div className="flex flex-row gap-2">
                <div className="w-2">3</div>
                <Progress
                  percent={percenThreeStar}
                  showInfo={false}
                  size="small"
                  strokeColor="orange"
                />
              </div>

              <div className="flex flex-row gap-2">
                <div className="w-2">2</div>
                <Progress
                  percent={percenTwoStar}
                  showInfo={false}
                  size="small"
                  strokeColor="orange"
                />
              </div>

              <div className="flex flex-row gap-2">
                <div className="w-2">1</div>
                <Progress
                  percent={percenOneStar}
                  showInfo={false}
                  size="small"
                  strokeColor="orange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-4">
        <div className="pt-5 flex flex-col overflow-x-hidden overflow-y-auto h-[600px]">
          {rating?.content?.map((item: any, index: number) => (
            <ApartmentReivewBoxModal key={index} rating={item} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ModalBaseDetail
      body={bodyContent}
      isOpen={apartmentReviewModal.isOpen}
      onClose={apartmentReviewModal.onClose}
    />
  );
};

export default ModalApartmentReview;
