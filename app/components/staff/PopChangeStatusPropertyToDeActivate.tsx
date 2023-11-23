import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from '@/app/libs/axios';

interface PopChangeStatusPropertyToDeActivateProps {
  fetchProperties: () => void;
  id: number;
}

const PopChangeStatusPropertyToDeActivate: React.FC<PopChangeStatusPropertyToDeActivateProps> = ({
  id,
  fetchProperties,
}) => {
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    let data = JSON.stringify('DEACTIVATE');
    return new Promise((resolve) => {
      //setTimeout(() => resolve(null), 3000);
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `https://holiday-swap.click/api/v1/properties/${id}/status`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          message.success('Change status success.');
          resolve(null);
          fetchProperties();
        })
        .catch((error) => {
          message.error(`Change status failed. \n ${error}`);
          resolve(null);
          console.log(error);
        });
    });
  };
  return (
    <Popconfirm
      title={'Change status the property'}
      description="Are you sure to change status this property?"
      onConfirm={(e: any) => confirm(e)}
      // onCancel={(e: any) => cancel(e)}
      okText="Yes"
      cancelText="No"
      okType="default"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    >
      <Button danger>Deactive</Button>
    </Popconfirm>
  );
};

export default PopChangeStatusPropertyToDeActivate;
