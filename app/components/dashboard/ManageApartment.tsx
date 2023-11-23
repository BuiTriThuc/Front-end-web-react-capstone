'use client';
import { Image } from 'antd';
import React, { useState, useRef, Fragment } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import EditPublicTime from '../managementApartment/EditPublicTime';
import { BiBlock } from 'react-icons/bi';
import { Upload } from 'antd';
import useCreatePublicTimeModal from '@/app/hooks/useCreatePublicTimeModal';

interface ManageApartmentProps {
  detailCoOwner: any;
  propertyDetail: any;
}

const ManageApartment: React.FC<ManageApartmentProps> = ({ detailCoOwner, propertyDetail }) => {
  const imagesData = [
    {
      src: '/images/resort1.jpg',
      alt: 'destination 1',
    },
    {
      src: '/images/resortdetail1.jpg',
      alt: 'destination 2',
    },
    {
      src: '/images/resortdetail2.jpg',
      alt: 'destination 3',
    },
    {
      src: '/images/resortdetail3.jpg',
      alt: 'destination 4',
    },
    {
      src: '/images/resortdetail4.jpg',
      alt: 'destination 5',
    },
  ];
  const [detail, setDetail] = useState(detailCoOwner);
  const [images, setImages] = useState(imagesData);
  const imageInputRef = useRef(null);
  const createModalPublicTime = useCreatePublicTimeModal();

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
      updatedImages.push({ src: imageURL, alt: 'New Image' });
      setImages(updatedImages);
    }
  };

  return (
    <div>
      <Image.PreviewGroup>
        <div className="py-3">
          <div className="flex flex-row gap-3 w-full">
            {/* <div className="w-[60%]  gap-2 py-4 md:grid md:grid-cols-1  md:gap-2 md:py-4">
              <div className="relative hidden md:block md:relative lg:block lg:relative xl:block xl:relative">
                <div className="hidden md:grid md:grid-cols-1 md:gap-2  lg:grid lg:grid-cols-2 lg:gap-2  xl:grid xl:grid-cols-2 xl:gap-2 ">
                  {detailCoOwner.contractImages.slice(0, 5).map((item: any, index: number) => (
                    <div
                      key={item.id}
                      className={`w-full  relative overflow-hidden  md:block ${
                        index === 1 ? '' : ''
                      } ${index === 3 ? '' : ''}`}
                    >
                      <Image
                        key={item.id}
                        alt="image"
                        src={item.link}
                        className="object-cover w-full cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
            <div className="w-[60%]">
              <div className="flex flex-row gap-3">
                {detail.contractImages.length === 1 ? (
                  <Fragment>
                    {detail.contractImages.map((item: any, index: number) => (
                      <Image
                        key={item.id}
                        src={item.link}
                        width="100%"
                        height={500}
                        alt="contract image"
                      />
                    ))}
                  </Fragment>
                ) : (
                  <Fragment>
                    {detail.contractImages.map((item: any, index: number) => (
                      <Image
                        key={item.id}
                        src={item.link}
                        width={200}
                        height={200}
                        alt="contract image"
                      />
                    ))}
                  </Fragment>
                )}
                {}
              </div>
            </div>
            <div className="w-[40%]">
              <div className="border border-gray-500  rounded-md px-5">
                <div className="py-2">
                  <div className="flex flex-row items-center justify-between gap-3 mb-3 mt-3">
                    <div className="underline text-[20px] ">{propertyDetail?.propertyName}</div>
                    <div>
                      <FiEdit size={20} />
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="underline">Status:</div>
                    <div className="flex flex-row items-center w-full justify-between">
                      <div className="underline text-common">{detail.status}</div>
                      <div>
                        <FiEdit size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center w-full justify-between py-4">
                    <div>
                      Resort: <span className="text-common">Phu Quoc Resort VIP</span>
                    </div>
                    <BiBlock />
                  </div>
                  <div className="flex flex-row items-center w-full justify-between ">
                    <div>Pbulic time:</div>
                    <FiEdit size={20} />
                  </div>
                  <div className="flex flex-row items-center w-full justify-between py-4">
                    <div>
                      Apartment ID: <span className="text-common">{detail.id.roomId}</span>
                    </div>
                    <BiBlock />
                  </div>
                  <div className="flex flex-row items-center w-full justify-center mt-4">
                    <button
                      onClick={() => createModalPublicTime.onOpen(detail)}
                      className="px-5 py-2 my-3 bg-common text-white rounded-md"
                    >
                      Create public time
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="relative rounded-md border-dashed border-2 border-gray-300 p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={imageInputRef}
                className="absolute w-full h-full opacity-0"
              />
              <div className="text-center">
                <label form="imageInput" className="cursor-pointer">
                  <span className="text-gray-600">Upload more images</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="py-2">Description</div>
            <textarea className="w-full  rounded-md" name="" id="" cols={20} rows={10}></textarea>
          </div>
          <div className="flex flex-row w-full justify-end">
            <button className="text-white bg-common rounded-md px-5 py-2 ">Save</button>
          </div>
        </div>
      </Image.PreviewGroup>
    </div>
  );
};

export default ManageApartment;
