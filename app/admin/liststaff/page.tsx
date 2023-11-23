import React, { Fragment } from 'react';
import ListStaff from '../../components/admin/ListStaff';
import GetListUser from '@/app/actions/getListUser';
import requireAuth from '@/app/libs/requireAuth';
import GetListUserStaffAdmin from '@/app/actions/getListUserStaffAdmin';

export const metadata = {
  title: 'Manage Staff Admin',
};

export default async function ListStaffPage() {
  const listAdminUser = await GetListUserStaffAdmin();

  return requireAuth(
    <Fragment>
      <ListStaff listUser={listAdminUser} />
    </Fragment>,
    [1]
  );
}
