import React from 'react';
import requireAuth from '@/app/libs/requireAuth';
import EditProfileComponent from '@/app/components/dashboard/EditProfileComponent';
import GetCurrentUser from '@/app/actions/getCurrentUser';

export const metadata = {
  title: 'Edit Profile',
};

export default async function EditProfile() {
  const currentUser = await GetCurrentUser();
  return requireAuth(
    <div>
      <EditProfileComponent/>
    </div>,
    [1, 2, 3, 4]
  );
}
