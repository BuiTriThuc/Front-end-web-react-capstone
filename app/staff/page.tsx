import React from 'react';
import requireAuth from '../libs/requireAuth';
import StaffDashboard from '../components/staff/StaffDasboard';
import GetCurrentUser from '../actions/getCurrentUser';

export const metadata = {
  title: 'Staff Dashboard',
};

export default async function DashBoard() {
  const currentUser = await GetCurrentUser();

  return requireAuth(
    <div className="py-3">
      <div>
        <StaffDashboard currentUser={currentUser} />
      </div>
    </div>,
    [3]
  );
}
