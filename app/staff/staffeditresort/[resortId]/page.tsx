import GetResortById from '@/app/actions/getResortById';
import UploadImageResortEdit from '@/app/components/staff/UploadImageResortEdit';
import requireAuth from '@/app/libs/requireAuth';
import React from 'react';
import InputAmenitiesType from './InputAmenitiesType';
import EditResort from './EditResort';
import GetAmenityResortType from '@/app/actions/getAmenityResortType';
import GetPropertyType from '@/app/actions/getPropertyType';
import axios from 'axios';
import { Place, Location } from '@/app/staff/createresort/CreateResort';

interface IParams {
  resortId: string;
}

export default async function StaffEditResort({ params }: { params: IParams }) {
  const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
  const resortDetail = await GetResortById(params);
  const amineties = await GetAmenityResortType();
  const propertyTypes = await GetPropertyType();
  const locationPromise = axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${resortDetail?.resortName}.json?access_token=${MAPBOX_TOKEN}&country=vn`)
    .then(response => {
      const fetchedLocation = (response?.data?.features as Place[])
          ?.find((place) => place.id === resortDetail?.locationCode)
        ?? response?.data?.features[0];
      return {
        ...fetchedLocation,
        place_name: resortDetail?.addressLine,
      };
    });
  const location = await locationPromise;

  return requireAuth(
    <div>
      <div className="">
        Dashboard {'>'} <span className="text-common">Update resort</span>
      </div>
      
      <EditResort resortDetail={resortDetail} amineties={amineties} propertyTypes={propertyTypes} fetchLocation ={location}/>
    </div>,
    [3]
  );
}
