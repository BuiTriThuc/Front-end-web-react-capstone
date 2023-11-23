'use client';

import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Progress } from 'antd';

interface ApartmentReviewProps {
  apartment: any;
  rating: any;
}

const ApartmentReivew: React.FC<ApartmentReviewProps> = ({ apartment, rating }) => {
  const percenFiveStar = Number(
    (rating.content.filter((item: any) => item.rating === 5).length / rating.content.length) * 100
  );
  const percenFourStar = Number(
    (rating.content.filter((item: any) => item.rating === 4).length / rating.content.length) * 100
  );
  const percenThreeStar = Number(
    (rating.content.filter((item: any) => item.rating === 3).length / rating.content.length) * 100
  );
  const percenTwoStar = Number(
    (rating.content.filter((item: any) => item.rating === 2).length / rating.content.length) * 100
  );
  const percenOneStar = Number(
    (rating.content.filter((item: any) => item.rating === 1).length / rating.content.length) * 100
  );

  return (
    <div className="flex flex-col gap-2 w-60">
      <div className="flex flex-row items-center gap-1">
        <AiFillStar size={30} color="orange" />
        <div className="text-2xl font-bold">
          {apartment?.property?.rating.toFixed(2)} · {rating?.content?.length} reviews
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-2">
          <div className="w-2">5</div>
          <Progress percent={percenFiveStar} showInfo={false} size="small" strokeColor="orange" />
        </div>

        <div className="flex flex-row gap-2">
          <div className="w-2">4</div>
          <Progress percent={percenFourStar} showInfo={false} size="small" strokeColor="orange" />
        </div>

        <div className="flex flex-row gap-2">
          <div className="w-2">3</div>
          <Progress percent={percenThreeStar} showInfo={false} size="small" strokeColor="orange" />
        </div>

        <div className="flex flex-row gap-2">
          <div className="w-2">2</div>
          <Progress percent={percenTwoStar} showInfo={false} size="small" strokeColor="orange" />
        </div>

        <div className="flex flex-row gap-2">
          <div className="w-2">1</div>
          <Progress percent={percenOneStar} showInfo={false} size="small" strokeColor="orange" />
        </div>
      </div>
    </div>
  );
};

export default ApartmentReivew;
