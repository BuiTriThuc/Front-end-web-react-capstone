// "use client";

// import Image from "next/image";
// import * as React from "react";
// import { differenceInDays, format } from "date-fns";
// import { useRouter } from "next/navigation";

// interface MyBookingListProps {
//   historyBooking: any;
// }

// const MyBookingList: React.FC<MyBookingListProps> = ({ historyBooking }) => {
//   const router = useRouter();
//   const calculateNightDifference = (startDate: any, endDate: any) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const nightDifference = differenceInDays(end, start);
//     return nightDifference;
//   };

//   return (
//     <div className="py-6">
//       {historyBooking?.map((item: any) => (
//         <div
//           onClick={() => router.push(`/dashboard/myBooking/${item.bookingId}`)}
//           key={item.bookingId}
//           className="grid grid-cols-12 h-[150px] bg-white rounded-lg shadow-lg justify-between hover:cursor-pointer my-5"
//         >
//           <div className="col-span-9">
//             <div className="grid grid-cols-9 h-full gap-5">
//               <div className="col-span-3 w-full h-full relative rounded-lg">
//                 <Image
//                   src="/images/resort1.jpg"
//                   fill
//                   alt="image"
//                   className="w-full object-cover rounded-lg"
//                 />
//               </div>
//               <div className="col-span-6 flex flex-col">
//                 <div className="py-2">
//                   <div className="text-xs text-gray-700">{item.resortName}</div>
//                   <div className="text-lg font-bold ">{item.propertyName}</div>
//                 </div>
//                 <div className="text-base text-gray-700">
//                   {format(new Date(item.checkInDate), "dd, MMM yyyy")} -{" "}
//                   {format(new Date(item.checkOutDate), "dd, MMM yyyy")}
//                 </div>
//                 <div className="text-base text-gray-700">
//                   Number of nights:{" "}
//                   {calculateNightDifference(
//                     item.checkInDate,
//                     item.checkOutDate
//                   )}
//                 </div>
//                 <div className="text-base text-gray-700">
//                   Total: <span className="text-black">{item.price} point</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-3 flex flex-row justify-center items-center">
//             <div className="text-lg text-green-600">{item.status}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyBookingList;
'use client';
import Image from 'next/image';
import * as React from 'react';
import { differenceInDays, format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface MyBookingListProps {
  historyBooking: any;
}

const MyBookingList: React.FC<MyBookingListProps> = ({ historyBooking }) => {
  const router = useRouter();
  const calculateNightDifference = (startDate: any, endDate: any) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nightDifference = differenceInDays(end, start);
    return nightDifference;
  };

  return (
    <div className="py-6">
      {historyBooking?.length > 0 ? (
        historyBooking.map((item: any) => (
          <div
            onClick={() => router.push(`/dashboard/myBooking/${item.bookingId}`)}
            key={item.bookingId}
            className="grid grid-cols-12 h-[150px] bg-white rounded-lg shadow-lg justify-between hover:cursor-pointer my-5"
          >
            <div className="col-span-9">
              <div className="grid grid-cols-9 h-full gap-5">
                <div className="col-span-3 w-full h-full relative rounded-lg">
                  <Image
                    src={item.propertyImage}
                    fill
                    alt="image"
                    className="w-full object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-6 flex flex-col">
                  <div className="py-2">
                    <div className="text-xs text-gray-700">{item.resortName}</div>
                    <div className="text-lg font-bold ">{item.propertyName}</div>
                  </div>
                  <div className="text-base text-gray-700">
                    {format(new Date(item.checkInDate), 'dd, MMM yyyy')} -{' '}
                    {format(new Date(item.checkOutDate), 'dd, MMM yyyy')}
                  </div>
                  <div className="text-base text-gray-700">
                    Number of nights:{' '}
                    {calculateNightDifference(item.checkInDate, item.checkOutDate)}
                  </div>
                  <div className="text-base text-gray-700">
                    Total: <span className="text-black">{item.price} point</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3 flex flex-row justify-center items-center">
              <div className="text-lg text-green-600">{item.status}</div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="text-[30px]">My booking</div>
          <div className="w-full h-[1px] bg-gray-300 my-8"></div>
          <div className="text-[25px] font-bold">No apartments booked....Not yet!</div>
          <div className="py-5 text-gray-700">
            It&apos;s time to dust off your bags and start planning for your next adventure
          </div>
          <button className="border border-gray-500 rounded-md px-10 py-3 hover:bg-gray-100">
            Start searching
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookingList;
