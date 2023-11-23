import ApartmentOfMembership from '@/app/components/staff/ApartmentOfMembership';
import DropDownBanMember from '@/app/components/staff/DropDownBanMember';
import requireAuth from '@/app/libs/requireAuth';
import Link from 'next/link';
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Container from '@/app/components/Container';
import FormDetailProperty from './FormDetailProperty';
interface IParams {
  propertyId: number;
}
const EditProperty = ({ params }: { params: IParams }) => {
  return requireAuth(
    <div>
      <div className="bg-gray-200 w-auto h-auto rounded-lg px-20 pt-14">
        <div>
          <div className="flex flex-row justify-between items-center pb-10">
            <div className="text-[20px] font-bold text-common">Detail Property</div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row mb-14 ">
              <FormDetailProperty propertyId={params.propertyId} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    [3]
  );
};
export default EditProperty;
