import MyExchangeList from '@/app/components/dashboard/MyExchangeList';
import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export default function MyExchange() {
  return requireAuth(
    <div>
      <div>
        Dashboard {'>'} <span className="text-common">My Exchange</span>
      </div>
      <div>
        <MyExchangeList />
      </div>
    </div>,
    [2, 4]
  );
}
