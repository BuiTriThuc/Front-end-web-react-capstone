import Provider from '../components/Provider';
import Sidebar from '../components/dashboard/Sidebar';
import React from 'react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <div className="flex flex-row  pt-20">
        <div className="sticky col-span-4 top-0 h-full">
          <Sidebar />
        </div>
        <main className="w-full  h-full pr-14 col-span-8 mt-8">{children}</main>
      </div>
    </Provider>
  );
}
