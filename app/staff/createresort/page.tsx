import UploadImageResortCreate from '@/app/components/staff/UploadImageResortCreate';
import React from 'react';
import CreateResort from './CreateResort';
import GetAmenityResortType from '@/app/actions/getAmenityResortType';
import GetPropertyType from '@/app/actions/getPropertyType';
import requireAuth from '@/app/libs/requireAuth';
import GetInRoomAmenities from '@/app/actions/getInRoomAmenities';

export const metadata = {
  title: 'Create Resort',
};

export default async function CreateResortPage() {
  const amineties = await GetAmenityResortType();
  // const propertyTypes = await GetInRoomAmenities();
  const propertyTypes = await GetPropertyType();
  return requireAuth(
    <CreateResort amenitiesArray={amineties} propertyTypesArray={propertyTypes} />,
    [3]
  );
}
