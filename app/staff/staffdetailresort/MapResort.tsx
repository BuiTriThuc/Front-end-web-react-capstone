'use client';

import React from 'react';

import GoogleMapReact from 'google-map-react-concurrent';

interface MarkerProps {
  text?: string;
  lat?: number;
  lng?: number;
}

const Marker: React.FC<MarkerProps> = ({ text }) => (
  <span className="flex px-1 py-1 rounded-lg bg-white dark:bg-neutral-900 text-sm font-semibold items-center justify-center min-w-max shadow-lg hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors ">
    <span>Resort Name:{text}</span>
  </span>
);

interface IParams {
  latitude: number;
  longitude: number;
  resortName?: string;
  id?: string;
}
const MapResort: React.FC<IParams> = ({ latitude, id, resortName, longitude }) => {
  return (
    <div className=" w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyDTZQ9gsIrh6G2_HtnX7pTgFS74G_VVedU',
          version: 'weekly',
        }}
        defaultCenter={{
          lat: latitude,
          lng: longitude,
        }}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker key={id} lat={latitude} lng={longitude} text={resortName} />
      </GoogleMapReact>
    </div>
  );
};
export default MapResort;
