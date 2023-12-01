import React, { Fragment } from 'react';
import Ownership from '../../components/dashboard/Ownership';
import GetOwnershipByUserId from '@/app/actions/getOwnershipByUserId';
import GetListResort from '@/app/actions/getListResort';
import GetCurrentUser from '@/app/actions/getCurrentUser';
import requireAuth from '@/app/libs/requireAuth';
import GetListResortForCreateOwner from '@/app/actions/getListResortForCreateOwner';

const OwnershipPage = async () => {
  const ownershipUser = await GetOwnershipByUserId();
  const listResort = await GetListResortForCreateOwner('0');
  const currentUser = await GetCurrentUser();

  return requireAuth(
    <Fragment>
      <Ownership ownershipUser={ownershipUser} resort={listResort} currentUser={currentUser} />
    </Fragment>,
    [2, 4]
  );
};

export default OwnershipPage;
