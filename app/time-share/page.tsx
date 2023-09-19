import React from "react";
import TimeShareTable from "../components/detailResort/TimeShareTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TimeShareHeader from "../components/time-share/TimeShareHeader";
import TimeShareDetail from "../components/time-share/TimeShareDetail";
import TimeShareList from "../components/time-share/TimeShareList";

export default function TimeShare() {
  return (
    <div>
      <Header />
      <div className="bg-[#F5F5F7] flex items-center justify-center ">
        <div className="text-5xl  pt-[190px] pb-[70px] -mt-[20px]">
          Time Share
        </div>
      </div>
      <div className="px-[70px] pb-[20px]">
        <TimeShareHeader />
      </div>
      <div className="px-[70px] pb-[20px]">
        <TimeShareDetail />
      </div>
      <div className="px-[70px] pb-[20px] mb-10">
        <TimeShareList />
      </div>
      <Footer />
    </div>
  );
}
