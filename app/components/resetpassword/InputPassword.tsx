'use client';
import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const InputPassword: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Space className="w-full flex flex-col gap-5" direction="vertical">
      <Input.Password className="py-3" placeholder="input new password" />
      <Input.Password
        className="py-3"
        placeholder="Confirm new password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    </Space>
  );
};

export default InputPassword;
