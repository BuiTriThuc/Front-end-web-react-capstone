import React from 'react';
import requireAuth from '@/app/libs/requireAuth';
import EditProfileComponent from '@/app/components/dashboard/EditProfileComponent';

export const metadata = {
  title: 'Edit Profile',
};

export default function EditProfile() {
  return requireAuth(
    <div>
      <EditProfileComponent />
    </div>,
    [1, 2, 3, 4]
  );
}
