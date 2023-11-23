import Provider from '../components/Provider';
import Sidebar from '../components/dashboard/Sidebar';
import React from 'react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <div className="flex flex-row  pt-20">
        <div>
          <Sidebar />
        </div>
        <main className="w-full px-10">{children}</main>
      </div>
    </Provider>
  );
}
