import ListMembershipBanned from '@/app/components/staff/ListMembershipBanned';
import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export default function Banned() {
  return requireAuth(
    <div>
      <ListMembershipBanned />
    </div>,
    [3]
  );
}
