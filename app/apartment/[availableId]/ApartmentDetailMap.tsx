'use client';

import React from 'react';
import GoogleMapReact from 'google-map-react-concurrent';

interface MarkerProps {
  text?: number;
  lat?: number;
  lng?: number;
}

const Marker: React.FC<MarkerProps> = ({ text }) => (
  <span className="flex px-1 py-1 rounded-lg bg-white dark:bg-neutral-900 text-sm font-semibold items-center justify-center min-w-max shadow-lg hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors">
    <span>Point:{text}</span>
  </span>
);

interface ApartmentDetailMapProps {
    apartment: any;
}

const ApartmentDetailMap: React.FC<ApartmentDetailMapProps> = ({ apartment }) => {
  return (
    <div className="flex flex-col">
        <div className="text-2xl font-bold">Location</div>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400 py-5">
          {apartment.resort.locationFormattedName}
        </span>
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
        
      <div className="rounded-xl overflow-hidden z-0">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDTZQ9gsIrh6G2_HtnX7pTgFS74G_VVedU',
            version: 'weekly',
          }}
          defaultCenter={{
            lat: apartment.resort.latitude,
            lng: apartment.resort.longitude,
          }}
          defaultZoom={12}
          yesIWantToUseGoogleMapApiInternals
        >
          <Marker
            key={apartment.resort.id}
            lat={apartment.resort.latitude}
            lng={apartment.resort.longitude}
            text={apartment.availableTime.pricePerNight}
          />
        </GoogleMapReact>
      </div>
    </div>
    </div>
  );
};

export default ApartmentDetailMap;
