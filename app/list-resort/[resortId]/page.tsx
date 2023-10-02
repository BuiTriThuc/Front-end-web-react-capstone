import getResortById from "@/app/actions/getResortById";
import CardApartmentType from "@/app/components/apartment/CardApartmentType";
import DetailContent from "@/app/components/detailResort/DetailContent";
import DetailContentTop from "@/app/components/detailResort/DetailContentTop";
import HeaderDetailResort from "@/app/components/detailResort/HeaderDetailResort";
import ImageDetailResort from "@/app/components/detailResort/ImageDetailResort";
import RightSideBar from "@/app/components/detailResort/RightSideBar";
import React from "react";

interface IParams {
  resortId?: string;
}

const ResortPage = async ({ params }: { params: IParams }) => {
  const resort = await getResortById(params);

  return (
    <div className="flex flex-col ">
      <div className="px-[70px]">
        <HeaderDetailResort />
      </div>
      <div className="w-full h-[0.5px] bg-gray-300 mt-[0px]"></div>
      <div className="px-[70px]">
        <DetailContentTop resortName={resort?.resortName} />
      </div>
      <div className="px-[70px] pb-[20px]">
        <ImageDetailResort resortImages={resort?.resortImages} />
      </div>
      <div className="flex flex-row px-[70px]">
        <DetailContent />
        <RightSideBar />
      </div>

      <div className="flex flex-row px-[70px] py-10 ">
        <CardApartmentType />
      </div>
    </div>
  );
};

export default ResortPage;