import React, { FC } from "react";
import GallerySlider from "./GallerySlider";
import StartRating from "./StartRating";
import BtnLikeIcon from "./BtnLikeIcon";
import SaleOffBadge from "./SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { StayDataType } from '@/app/components/map/type';
import Image from 'next/image';
import { Coords } from 'google-map-react-concurrent';

export interface PropertyCardHProps {
  className?: string;
  data?: StayDataType;
  setCoordinates?: React.Dispatch<React.SetStateAction<Coords | undefined>>;
}

const PropertyCardH: FC<PropertyCardHProps> = ({
  className = "",
  data = {},
                                                 setCoordinates,
}) => {
  const {
    galleryImgs,
    title,
    href,
    like,
    saleOff,
    isAds,
    price,
    roomSize,
    bedrooms,
    bathrooms,
    listingCategory,
    reviewStart,
    reviewCount,
    id,
    propertyView,
    resortName,
    ownerName,
    ownerAvatar,
    map,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full sm:w-64 ">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={galleryImgs??["https://media-cdn.tripadvisor.com/media/photo-s/28/fd/37/ed/pearl-farm-beach-resort.jpg"]}
          className="w-full h-full rounded-2xl overflow-hidden"
          uniqueID={`${id}`}
          href={href}
        />

        {saleOff && (
          <SaleOffBadge className="absolute left-5 top-5 !bg-orange-500" />
        )}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="inline-grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bed text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {bedrooms} beds
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bath text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {bathrooms} baths
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {roomSize} Sq. Fit
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-4 w-full">
          <div className="inline-flex space-x-3">
            {propertyView && (
              <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-share-alt"></i>
                  <span className="ml-1">{propertyView}</span>
                </div>
              }
            />)}

            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">{listingCategory}</span>
                </div>
              }
              color="yellow"
            />
          </div>
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{title}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="flex items-center space-x-2">
            <p className="text-gray-600 text-sm ml-2">
              <span className="line-clamp-1">{resortName}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-2">
            <div className="relative inline-block rounded-full overflow-hidden h-3.5 w-3.5 md:h-5 md:w-5">
              <Image alt="Avatar" src={`${ownerAvatar??"/images/placeholder.jpg"}`} fill/>
            </div>
            <p className="text-gray-600 text-sm">
              <span>Owner: {ownerName}</span>
            </p>
          </div>
          <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
          <div className="flex w-full justify-between items-end">
            {/*<StartRating reviewCount={reviewCount} point={reviewStart} />*/}
            <span className="flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none text-sm font-medium text-secondary-500">
              {`${price} point/night`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden ${className}`}
    >
      {/*<Link href={`${href}/${id}`} className="absolute inset-0" target='_blank'></Link>*/}
      <div onClick={()=>{
        if(setCoordinates){
          setCoordinates({lat: map?.lat??10.200809, lng: map?.lng??103.96685})
        }
      }} className="absolute inset-0"></div>
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        {renderContent()}
      </div>
      <BtnLikeIcon
        colorClass={` bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-6000 dark:text-neutral-400`}
        isLiked={like}
        className="absolute right-5 top-5 sm:right-3 sm:top-3 "
      />
    </div>
  );
};

export default PropertyCardH;
