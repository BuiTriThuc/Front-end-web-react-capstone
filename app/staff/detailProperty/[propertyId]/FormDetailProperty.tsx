/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Image, Input, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';

interface FormDetailPropertyProps {
  propertyId: number;
}

const FormDetailProperty: React.FC<FormDetailPropertyProps> = ({ propertyId }) => {
  const [propertyDetail, setPropertyDetail] = useState<PropertyType>();
  const fetchPropertyDetail = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://holiday-swap.click/api/v1/properties/${propertyId}`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        setPropertyDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchPropertyDetail();
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="text-[8px] font-bold text-common">{'Status:'}</div>
        <div className="text-[8px] font-bold text-common">{propertyDetail?.status}</div>
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        <div className="flex flex-col mr-10 text-gray-400 ">
          <div className="mb-5">Property Name</div>
        </div>
        <div className="flex flex-col mr-16 text-gray-600 ">
          <div className="mb-5"> {propertyDetail?.propertyName}</div>
        </div>
        <div className="flex flex-col mr-10 text-gray-400 ">
          <div className="mb-5">Property Description</div>
        </div>
        <div className="flex flex-col mr-16 text-gray-600 ">
          <div className="mb-5"> {propertyDetail?.propertyDescription}</div>
        </div>
        <div className="flex flex-col mr-10 text-gray-400 ">Property Image</div>
        <div className="flex flex-col mr-16 text-gray-600 col-span-3">
          <div>
            <Image.PreviewGroup>
              {propertyDetail?.propertyImage.map((e, index) => (
                <Image key={index} src={e.link} width={75} alt={e.link} />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
        {propertyDetail?.numberKingBeds ?? 0 > 0 ? (
          <>
            <div className="flex flex-col mr-10 text-gray-400 ">
              <div className="mb-5">King Bed</div>
            </div>
            <div className="flex flex-col mr-16 text-gray-600">
              <div className="mb-5"> {propertyDetail?.numberKingBeds}</div>
            </div>
          </>
        ) : (
          ''
        )}
        {propertyDetail?.numberQueenBeds ?? 0 > 0 ? (
          <>
            <div className="flex flex-col mr-10 text-gray-400 ">
              <div className="mb-5">Queen Bed</div>
            </div>
            <div className="flex flex-col mr-16 text-gray-600">
              <div className="mb-5"> {propertyDetail?.numberQueenBeds}</div>
            </div>
          </>
        ) : (
          ''
        )}
        {propertyDetail?.numberSingleBeds ?? 0 > 0 ? (
          <>
            <div className="flex flex-col mr-10 text-gray-400 ">
              <div className="mb-5">Single Bed</div>
            </div>
            <div className="flex flex-col mr-16 text-gray-600">
              <div className="mb-5"> {propertyDetail?.numberSingleBeds}</div>
            </div>
          </>
        ) : (
          ''
        )}
        {propertyDetail?.numberDoubleBeds ?? 0 > 0 ? (
          <>
            <div className="flex flex-col mr-10 text-gray-400 ">
              <div className="mb-5"> Double Bed</div>
            </div>
            <div className="flex flex-col mr-16 text-gray-600">
              <div className="mb-5"> {propertyDetail?.numberDoubleBeds}</div>
            </div>
          </>
        ) : (
          ''
        )}
        {propertyDetail?.numberTwinBeds ?? 0 > 0 ? (
          <>
            <div className="flex flex-col mr-10 text-gray-400 ">
              <div className="mb-5"> Twin Bed</div>
            </div>
            <div className="flex flex-col mr-16 text-gray-600">
              <div className="mb-5"> {propertyDetail?.numberTwinBeds}</div>
            </div>
          </>
        ) : (
          ''
        )}
        {propertyDetail?.numberFullBeds ?? 0 > 0 ? (
          <>
            <div className="flex flex-col mr-10 text-gray-400 ">
              <div className="mb-5"> Full Bed</div>
            </div>
            <div className="flex flex-col mr-16 text-gray-600">
              <div className="mb-5"> {propertyDetail?.numberFullBeds}</div>
            </div>
          </>
        ) : (
          ''
        )}
        {propertyDetail?.numberSofaBeds ?? 0 > 0 ? (
          <>
            <div className="flex flex-col mr-10 text-gray-400 ">
              <div className="mb-5"> Sofa Bed</div>
            </div>
            <div className="flex flex-col mr-16 text-gray-600">
              <div className="mb-5"> {propertyDetail?.numberSofaBeds}</div>
            </div>
          </>
        ) : (
          ''
        )}
        {propertyDetail?.numberMurphyBeds ?? 0 > 0 ? (
          <>
            <div className="flex flex-col mr-10 text-gray-400 ">
              <div className="mb-5"> Murphy Bed</div>
            </div>
            <div className="flex flex-col mr-16 text-gray-600">
              <div className="mb-5"> {propertyDetail?.numberMurphyBeds}</div>
            </div>{' '}
          </>
        ) : (
          ''
        )}
        <div className="col-span-4 flex grid grid-cols-4 gap-4">
          <div className="flex flex-col mr-10 text-gray-400 ">
            <div className="mb-5"> Bed Room</div>
          </div>
          <div className="flex flex-col mr-16 text-gray-600">
            <div className="mb-5"> {propertyDetail?.numberBedsRoom}</div>
          </div>
          <div className="flex flex-col mr-10 text-gray-400 ">
            <div className="mb-5"> Bath Room</div>
          </div>
          <div className="flex flex-col mr-16 text-gray-600">
            <div className="mb-5"> {propertyDetail?.numberBathRoom}</div>
          </div>
        </div>
        <div className="flex flex-col mr-10 text-gray-400">
          <div className="mb-5">Size</div>
        </div>
        <div className="flex flex-col mr-16 text-gray-600 col-span-3">
          <div className="mb-5"> {propertyDetail?.roomSize}</div>
        </div>
        <div className="flex flex-col mr-10 text-gray-400 ">
          <div className="mb-5">Property Type</div>
        </div>
        <div className="flex flex-col mr-16 text-gray-600 col-span-3">
          <div className="mb-5"> {propertyDetail?.propertyType.propertyTypeName}</div>
        </div>
        <div className="flex flex-col mr-10 text-gray-400 ">
          <div className="mb-5">Property View</div>
        </div>
        <div className="flex flex-col mr-16 text-gray-600 col-span-3">
          <div className="mb-5"> {propertyDetail?.propertyView.propertyViewName}</div>
        </div>
        <div className="flex flex-col mr-10 text-gray-400 ">
          <div className="mb-5">Property In Room Amentity</div>
        </div>
        <div className="flex flex-col mr-16 text-gray-600 col-span-3">
          <div className="mb-5">
            {propertyDetail?.inRoomAmenityType.map((e) => (
              <ul key={e.id} className="">
                <li>{e.inRoomAmenityTypeName}</li>
                <div className="grid grid-cols-2 pl-10  gap-2">
                  {e.inRoomAmenities.map((e) => (
                    <div key={e.id} className="text-xs">
                      {e.inRoomAmenityName}
                    </div>
                  ))}
                </div>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormDetailProperty;
interface PropertyType {
  id: number;
  propertyName: string;
  propertyDescription: string;
  numberKingBeds: number;
  numberQueenBeds: number;
  numberSingleBeds: number;
  numberDoubleBeds: number;
  numberTwinBeds: number;
  numberFullBeds: number;
  numberSofaBeds: number;
  numberMurphyBeds: number;
  numberBedsRoom: number;
  numberBathRoom: number;
  roomSize: number;
  isDeleted: boolean;
  status: string;
  resortId: number;
  resort: {
    id: number;
    resortName: string;
    resortDescription: string;
    status: string;
    resortImages: [
      {
        id: number;
        resortId: number;
        link: string;
        deleted: boolean;
      }
    ];
    propertyTypes: [
      {
        id: number;
        propertyTypeName: string;
        propertyTypeDescription: string;
        deleted: boolean;
      }
    ];

    addressLine: string;
    locationFormattedName: string;
    locationDescription: string;
    locationCode: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    deleted: boolean;
  };
  propertyType: {
    id: number;
    propertyTypeName: string;
    propertyTypeDescription: string;
    deleted: boolean;
  };
  propertyView: {
    id: number;
    propertyViewName: string;
    propertyViewDescription: string;
    deleted: boolean;
  };
  inRoomAmenityType: [
    {
      id: number;
      inRoomAmenityTypeName: string;
      inRoomAmenityTypeDescription: string;
      isDeleted: boolean;
      inRoomAmenities: [
        {
          id: number;
          inRoomAmenityName: string;
          inRoomAmenityDescription: string;
          inRoomAmenityLinkIcon: string;
          isDeleted: boolean;
          inRoomAmenityTypeId: number;
        }
      ];
    }
  ];
  propertyImage: [
    {
      id: number;
      propertyId: number;
      link: string;
      deleted: boolean;
    }
  ];
  rating: number;
}
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
