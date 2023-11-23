import React from 'react';
import requireAuth from '@/app/libs/requireAuth';
import ChangePassword from '@/app/components/dashboard/ChangePassword';

export const metadata = {
  title: 'Change Password',
};

export default function DashBoard() {
  return requireAuth(
    <div>
      <ChangePassword />
    </div>,
    [2, 4]
  );
}
