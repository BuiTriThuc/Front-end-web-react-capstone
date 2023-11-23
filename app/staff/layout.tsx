import Provider from '../components/Provider';
import React from 'react';
import SidebarStaff from '../components/dashboard/SidebarStaff';

export default async function DashboardStaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <div className="flex flex-row gap-10 pt-20">
        <div className="sticky col-span-4 top-0 h-full">
          <SidebarStaff />
        </div>
        <main className="w-full mt-8 h-full pr-14 col-span-8">{children}</main>
      </div>
    </Provider>
  );
}
