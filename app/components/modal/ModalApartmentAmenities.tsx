'use client';

import useAparmentAmenitiesModal from '@/app/hooks/useApartmentAmenitiesModal';
import React from 'react';
import ModalBaseDetail from './ModalBaseDetail';
import Image from 'next/image';

const ModalApartmentAmenities = () => {
  const apartmentAmenitiesModal = useAparmentAmenitiesModal();
  const data = apartmentAmenitiesModal.data;

  const bodyContent = (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto no-scrollbar h-[90%]">
      <div className="py-5 font-bold text-2xl">What this place offers</div>
      {data?.property.inRoomAmenityType != null ? (
        data?.property.inRoomAmenityType.map((amenityType: any) => (
          <div key={amenityType.id} className="py-5 ">
            <div className="py-4 text-xl">{amenityType.inRoomAmenityTypeName}</div>

            <div className="py-4 flex flex-col gap-4">
              {amenityType.inRoomAmenities.map((amenity: any) => (
                <div key={amenity.id} className="flex flex-row gap-4 py-4 border-b border-gray-300">
                  <Image src={amenity.inRoomAmenityLinkIcon} width={30} height={20} alt="icon" />
                  <div>{amenity.inRoomAmenityName}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <ModalBaseDetail
      body={bodyContent}
      isOpen={apartmentAmenitiesModal.isOpen}
      onClose={apartmentAmenitiesModal.onClose}
    />
  );
};

export default ModalApartmentAmenities;
