import React from 'react';
import SidebarStaff from '../components/dashboard/SidebarStaff';
import Provider from '../components/Provider';
import SidebarAdmin from '../components/dashboard/SidebarAdmin';
import requireAuth from '../libs/requireAuth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return requireAuth(
    <Provider>
      <div className="flex flex-row gap-10 pt-20">
        <div className="sticky col-span-4 top-[100px] h-full">
          <SidebarAdmin />
        </div>
        <main className="w-full h-full pr-14 col-span-8">{children}</main>
      </div>
    </Provider>,
    [1]
  );
}
