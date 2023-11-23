'use client';

import React, { useState } from 'react';
import Carousel from './Carousel';

export const TopApartment = () => {
  const items = [
    'https://ak-d.tripcdn.com/images/0223412000araigzyE744_R_960_660_R5_D.jpg',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/487029186.jpg?k=b1758cc14fda25f1ab205c6be7b5476a3c247acf0c31edab52ac4ebaa6362406&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/293030706.jpg?k=d465d2b1e06e722dd3ac6ef6e6a5d0e03f94834e0f0d4145735a1d73c278371a&o=&hp=1',
    'https://fati-boutique-hotel-apartment-vung-tau.hotelmix.vn/data/Photos/OriginalPhoto/11823/1182388/1182388315/Fati-Boutique-Hotel-Apartment-Vung-Tau-Exterior.JPEG',
    'https://danhkhoi.com.vn/static/upload/images/Du-An/Aria-Vung-Tau/Aria-Vung-Tau-3.jpg',
    'https://q-xx.bstatic.com/xdata/images/hotel/max500/398318583.jpg?k=6d88fcfdb9ecd80aa3f0730f21d8511b68dcf5e47a329cd2d5b772cc1daa9be5&o=',
    'https://q-cf.bstatic.com/images/hotel/max1024x768/280/280360427.jpg',
  ];

  return (
    <div className="pb-32 -mt-10 flex flex-col ">
      <div className="flex justify-center">
        <div className="md:text-5xl text-3xl font-bold">
          Top <span className="text-common">Apartments</span>
        </div>
      </div>

      <div className="pt-20 w-auto">
        <Carousel slices={items} />
      </div>
    </div>
  );
};

export default TopApartment;
