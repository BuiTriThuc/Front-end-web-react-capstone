import GetListResort from '@/app/actions/getListResort';
import ListResortAll from '@/app/components/staff/ListResortAll';
import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export const metadata = {
  title: 'List Resort Staff',
};

export default async function ListResort() {
  const resorts = await GetListResort('0');
  return requireAuth(
    <div>
      <ListResortAll resorts={resorts} />
    </div>,
    [3]
  );
}
