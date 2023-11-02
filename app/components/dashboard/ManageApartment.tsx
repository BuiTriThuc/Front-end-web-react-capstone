// "use client";
// import Image from "next/image";
// import React, { useState, useRef } from "react";
// import { AiOutlineCloseCircle } from "react-icons/ai";
// import { FiEdit } from "react-icons/fi";

// export default function ManageApartment() {
//   const imagesData = [
//     {
//       src: "/images/resort1.jpg",
//       alt: "destination 1",
//     },
//     {
//       src: "/images/resortdetail1.jpg",
//       alt: "destination 2",
//     },
//     {
//       src: "/images/resortdetail2.jpg",
//       alt: "destination 3",
//     },
//     {
//       src: "/images/resortdetail3.jpg",
//       alt: "destination 4",
//     },
//     {
//       src: "/images/resortdetail4.jpg",
//       alt: "destination 5",
//     },
//   ];

//   const [images, setImages] = useState(imagesData);
//   const imageInputRef = useRef(null);

//   const handleDeleteImage = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);

//       const updatedImages = [...images];
//       updatedImages.push({ src: imageURL, alt: "New Image" });
//       setImages(updatedImages);
//     }
//   };

//   return (
//     <div>
//       <div className="py-3">
//         <div className="flex flex-row items-center gap-3">
//           <div className="underline text-[20px]">Apartment view bien Thuc</div>
//           <div>
//             <FiEdit size={20} />
//           </div>
//         </div>
//         <div className="flex flex-row gap-2">
//           <div className="image-large-container">
//             {images.length > 0 && (
//               <div className="image-wrapper flex flex-row">
//                 <Image
//                   src={images[0].src}
//                   alt={images[0].alt}
//                   height={800}
//                   width={350}
//                   className="w-[620px] h-[318px] rounded-xl relative"
//                 />
//                 <button
//                   onClick={() => handleDeleteImage(0)}
//                   className="delete-button absolute py-3 px-3"
//                 >
//                   <AiOutlineCloseCircle size={20} />
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="image-small-container grid grid-cols-2 gap-2">
//             {images.slice(1, 5).map((image, index) => (
//               <div key={index} className="image-container ">
//                 <div className="image-wrapper flex flex-row ">
//                   <div>
//                     <Image
//                       src={image.src}
//                       alt={image.alt}
//                       height={200}
//                       width={100}
//                       className="w-[195px] h-[150px] rounded-xl relative"
//                     />
//                   </div>
//                   <div className="absolute flex flex-row items-center justify-end">
//                     <button
//                       onClick={() => handleDeleteImage(index + 1)}
//                       className="delete-button py-3 px-3 left-0"
//                     >
//                       <AiOutlineCloseCircle size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             ref={imageInputRef}
//           />
//           <button
//             onClick={() => imageInputRef.current.click()}
//             className="add-image-button py-3 px-3"
//           >
//             Add Image
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import EditPublicTime from "../managementApartment/EditPublicTime";
import { BiBlock } from "react-icons/bi";

export default function ManageApartment() {
  const imagesData = [
    {
      src: "/images/resort1.jpg",
      alt: "destination 1",
    },
    {
      src: "/images/resortdetail1.jpg",
      alt: "destination 2",
    },
    {
      src: "/images/resortdetail2.jpg",
      alt: "destination 3",
    },
    {
      src: "/images/resortdetail3.jpg",
      alt: "destination 4",
    },
    {
      src: "/images/resortdetail4.jpg",
      alt: "destination 5",
    },
  ];

  const [images, setImages] = useState(imagesData);
  const imageInputRef = useRef(null);

  const handleDeleteImage = (index: any) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);

      const updatedImages = [...images];
      updatedImages.push({ src: imageURL, alt: "New Image" });
      setImages(updatedImages);
    }
  };

  return (
    <div>
      <div className="py-3">
        <div className="flex flex-row items-center gap-3 mb-3">
          <div className="underline text-[20px] ">Apartment view bien Thuc</div>
          <div>
            <FiEdit size={20} />
          </div>
        </div>
        <div className=" flex gap-3">
          <div className="image-large-container">
            {images.length > 0 && (
              <div className="image-wrapper flex flex-row">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  height={800}
                  width={350}
                  className="w-[700px] h-[318px] rounded-xl relative"
                />
                <button
                  onClick={() => handleDeleteImage(0)}
                  className="delete-button absolute py-3 px-3"
                >
                  <AiOutlineCloseCircle size={20} />
                </button>
              </div>
            )}
          </div>
          <div className="border border-gray-500 px-2 rounded-md">
            <div className="py-2">
              <div className="flex flex-row items-center w-full justify-between py-4">
                <div>
                  Resort:{" "}
                  <span className="text-common">Phu Quoc Resort VIP</span>
                </div>
                <BiBlock />
              </div>
              <div className="flex flex-row items-center w-full justify-between py-4">
                <div>
                  Apartment ID: <span className="text-common">887</span>
                </div>
                <BiBlock />
              </div>
              <EditPublicTime />
            </div>
          </div>
        </div>
        <div className="image-small-container flex flex-wrap gap-3 mt-3">
          {images.slice(1, images.length).map((image, index) => (
            <div key={index} className="image-container">
              <div className="image-wrapper flex flex-row">
                <div>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    height={200}
                    width={100}
                    className="w-[195px] h-[150px] rounded-xl relative"
                  />
                </div>
                <div className="absolute flex flex-row items-center justify-end">
                  <button
                    onClick={() => handleDeleteImage(index + 1)}
                    className="delete-button py-3 px-3 left-0"
                  >
                    <AiOutlineCloseCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef}
          />
          {/* <button
            onClick={() => imageInputRef?.current?.click()}
            className="add-image-button py-3 px-3"
          >
            Add Image
          </button> */}
        </div>
      </div>
    </div>
  );
}
