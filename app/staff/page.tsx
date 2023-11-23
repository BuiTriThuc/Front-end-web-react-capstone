import React from 'react';
import requireAuth from '../libs/requireAuth';
import StaffDashboard from '../components/staff/StaffDasboard';
import GetCurrentUser from '../actions/getCurrentUser';
import GetListResort from '../actions/getListResort';
import ListResortDashboard from '../components/staff/ListResortDashboard';
import ListMembershipDashboard from '../components/staff/ListMembershipDashboard';
import GetListUser from '../actions/getListUser';

export const metadata = {
  title: 'Staff Dashboard',
};

export default async function DashBoard() {
  const currentUser = await GetCurrentUser();
  const resorts = await GetListResort('0');
  const users = await GetListUser();

  return requireAuth(
    <div className="py-3">
      <div>
        <StaffDashboard currentUser={currentUser} />
      </div>
      <div>
        <ListResortDashboard resorts={resorts} />
      </div>
      <div>
        <ListMembershipDashboard users={users} />
      </div>
    </div>,
    [3]
  );
}
