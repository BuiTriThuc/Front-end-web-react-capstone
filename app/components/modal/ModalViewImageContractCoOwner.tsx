'use client';

import React, { useState } from 'react';
import { Button, Image, Modal, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import { Carousel } from 'flowbite-react';
interface imageProps {
  image: any[];
}
const ModalViewImageContractCoOwner = (image: imageProps) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type="link" onClick={showModal} icon={<EyeOutlined />}></Button>
      </Space>
      <Modal
        open={open}
        title="Contract Image"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="h-80">
          <Carousel>
            {image.image.map((img: any, i: number) => (
              <Image key={i} width="100%" height="100%" src={img.link} />
            ))}
          </Carousel>
        </div>
      </Modal>
    </>
  );
};

export default ModalViewImageContractCoOwner;
