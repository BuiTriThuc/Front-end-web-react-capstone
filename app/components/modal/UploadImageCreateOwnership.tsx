'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import { FaRegTimesCircle } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const convertBase64ToFile = function (image: any) {
  const byteString = atob(image.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const newBlob = new Blob([ab], {
    type: 'image/jpeg',
  });
  return newBlob;
};

interface UploadImageCreateOwnershipProps {
  handeChangeNewImages: (image: any) => void;
  handleDeleteImage: (image: any) => void;
  isClearImage: boolean;
}

const UploadImageCreateOwnership: React.FC<UploadImageCreateOwnershipProps> = ({
  handeChangeNewImages,
  handleDeleteImage,
  isClearImage
}) => {
  const [newImages, setNewImages] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<any[]>([]);

  useEffect(() => {
    if (isClearImage) {
        setPreviewImage([])
    }
  }, [isClearImage]);

  const handleDeleteImages = (item: any) => {
    if (item) {
      setPreviewImage(previewImage.filter((prev) => prev !== item));
      const imageConvert = convertBase64ToFile(item);
      console.log('Check image convert', imageConvert);
      handleDeleteImage(imageConvert);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files && Array.from(e.target.files);

    if (files) {
      files.forEach((file) => {
        handeChangeNewImages(file);
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewImage((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {previewImage.map((item: any, index: number) => (
          <div key={index} className="relative">
            <div className="p-2 border-gray-300 border rounded-md">
              <Image src={item} alt="image" width={1000} height={700} className="object-cover" />
            </div>
            <FaRegTimesCircle
              onClick={() => handleDeleteImages(item)}
              size={20}
              className="absolute top-1 right-1 cursor-pointer hover:opacity-90"
            />
          </div>
        ))}

        <div className="py-10 md:py-0 lg:py-0 xl:py-0 ">
          <label
            htmlFor="avatar"
            className="flex flex-col h-[200px] items-center justify-center border-dashed border border-gray-400 rounded-md hover:opacity-80 hover:cursor-pointer"
          >
            <GoPlus size={30} />
            <span>Upload</span>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="avatar"
            className="hidden"
            accept="image/*"
            multiple
          />
        </div>
      </div>
    </>
  );
};

export default UploadImageCreateOwnership;
