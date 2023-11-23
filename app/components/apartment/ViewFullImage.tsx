'use client';

import { Image } from 'antd';
import React from 'react';

interface ViewFullImageProps {
  listImage: any;
}
export default function ViewFullImage({ listImage }: ViewFullImageProps) {
  console.log('Check list iamge', listImage);
  return (
    <div className="w-full md:grid md:gap-2 md:grid-cols-2 xl:grid xl:grid-cols-2 xl:gap-2 xl:px-72">
      <Image.PreviewGroup>
        {listImage.map((item: any) => (
          <Image key={item.id} src={item.link} />
        ))}
      </Image.PreviewGroup>
    </div>
  );
}
