import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from '@/app/libs/axios';

interface PopConfirmDeletePropertyProps {
  fetchProperties: () => void;
  id: number;
}

const PopConfirmDeleteProperty: React.FC<PopConfirmDeletePropertyProps> = ({ id , fetchProperties}) => {
  const confirm = (e: React.MouseEvent<HTMLElement>) =>
    new Promise((resolve) => {
      //setTimeout(() => resolve(null), 3000);
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `https://holiday-swap.click/api/v1/properties/${id}`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          message.success('Delete success.');
          resolve(null);
          fetchProperties();
        })
        .catch((error) => {
          message.error(`Delete faild. \n ${error}`);
          resolve(null);
          console.log(error);
        });
    });
  return (
    <Popconfirm
      title={'Delete the property'}
      description="Are you sure to delete this property?"
      onConfirm={(e: any) => confirm(e)}
      // onCancel={(e: any) => cancel(e)}
      okText="Yes"
      cancelText="No"
      okType="default"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  );
};

export default PopConfirmDeleteProperty;
