import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
interface ModalDetailPropertyProps {
  id: number;
}
const ModalDetailProperty: React.FC<ModalDetailPropertyProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ color: 'white', backgroundColor: 'green' }}
        // icon={<FileSearchOutlined />}
      >
        Detail
      </Button>
      <Modal
        title="Detail property"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <Form>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          {/* <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default ModalDetailProperty;
