import React from 'react';
import requireAuth from '../libs/requireAuth';
import DashboardAdminPage from './dashboard/page';

export const metadata = {
  title: 'Dashboard Admin',
};

export default async function DashBoard() {
  return requireAuth(
    <div>
      <div>
        <div className="mt-10">
          Dashboard {'>'} <span className="text-common">Report</span>
        </div>
        <div className="py-3">
          <DashboardAdminPage />
        </div>
      </div>
    </div>,
    [1]
  );
}
