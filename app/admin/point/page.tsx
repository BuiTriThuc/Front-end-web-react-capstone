import React, { Fragment } from 'react';
import Point from '../../components/admin/Point';
import GetPoint from '@/app/actions/getPoint';
import requireAuth from '@/app/libs/requireAuth';

export const metadata = {
  title: 'Manage Point Admin',
};

export default async function PointPage() {
  const point = await GetPoint();
  return requireAuth(
    <Fragment>
      <Point point={point} />
    </Fragment>,
    [1]
  );
}
