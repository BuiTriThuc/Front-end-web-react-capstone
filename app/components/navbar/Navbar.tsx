// 'use client';

// import Link from 'next/link';
// import React from 'react';
// import { IoMdClose } from 'react-icons/io';

// interface NavbarProps {
//   onClick: () => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
//   return (
//     <div className="flex-1 justify-self-center md:block md:pb-0 md:mt-0 min-h-[1000px] bg-black top-0">
//       <div className="h-full px-6">
//         <div className="pt-4 px-5">
//           <IoMdClose size={30} color="white" onClick={onClick} />

//           <div className="pt-6 flex flex-col justify-center">
//             <div className="text-white py-5 border-b-[1px] border-white">Home</div>
//             <div className="text-white py-5 border-b-[1px] border-white">Destination</div>
//             <Link href="/apartment" className="text-white py-5 border-b-[1px] border-white">
//               Apartment
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface NavbarProps {
  onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const closeNavbar = () => {
    setIsNavbarOpen(false);
    onClick(); // Gọi hàm onClick được chuyền từ component cha để tắt navbar nếu cần
  };

  return (
    <div
      className={`flex-1 justify-self-center md:block md:pb-0 md:mt-0 min-h-[1000px] bg-black top-0 ${
        isNavbarOpen ? 'open' : ''
      }`}
    >
      <div className="h-full px-6">
        <div className="pt-4 px-5">
          <IoMdClose size={30} color="white" onClick={closeNavbar} />

          <div className="pt-6 flex flex-col justify-center">
            <div className="text-white py-5 border-b-[1px] border-white">Home</div>
            <Link
              href="/dashboard"
              className="text-white py-5 border-b-[1px] border-white"
              onClick={closeNavbar}
            >
              Dashboard
            </Link>{' '}
            <div className="text-white py-5 border-b-[1px] border-white">Destination</div>
            <Link
              href="/apartment"
              className="text-white py-5 border-b-[1px] border-white"
              onClick={closeNavbar}
            >
              Apartment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
