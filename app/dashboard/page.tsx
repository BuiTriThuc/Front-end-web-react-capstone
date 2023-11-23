import React from 'react';
import MyProfile from '../components/profile/MyProfile';
import requireAuth from '../libs/requireAuth';
import GetCurrentUser from '../actions/getCurrentUser';

export const metadata = {
  title: 'DashBoard',
};

export default async function DashBoard() {
  const currentUser = await GetCurrentUser();
  return requireAuth(
    <div className="py-3">
      <div>
        <MyProfile currentUser={currentUser} />
      </div>
    </div>,
    [2, 4]
  );
}
