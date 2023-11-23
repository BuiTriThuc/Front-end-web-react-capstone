'use client';

import Image from 'next/image';
import React from 'react';
import ReactStars from 'react-stars';

interface ApartmentReviewBoxProps {
  rating: any;
}

const ApartmentReivewBox: React.FC<ApartmentReviewBoxProps> = ({ rating }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={rating?.user?.avatar || '/images/placeholder.jpg'}
          width={50}
          height={50}
          alt="Avatar"
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-black text-base">
            {rating?.ratingType === 'PRIVATE' ? 'Anonymous users' : rating?.user?.fullName}
          </p>
          <p className="text-slate-400 text-base">6 years on HolidaySwap</p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <ReactStars count={5} size={15} color2="orange" value={rating?.rating} />
        <div>·</div>
        <div className="text-sm text-black">3 weeks ago</div>
      </div>

      <div className="text-base font-normal line-clamp-3">{rating?.comment}</div>
    </div>
  );
};

export default ApartmentReivewBox;
