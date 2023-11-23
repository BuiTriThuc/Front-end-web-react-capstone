import CreateStaffAccount from '@/app/components/admin/CreateStaffAccount';
import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export default function CreateStaff() {
  return requireAuth(
    <div>
      <CreateStaffAccount />
    </div>,
    [1]
  );
}
