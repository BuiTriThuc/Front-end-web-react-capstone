import UpgreadeMembershipList from '@/app/components/staff/UpgradeMembershipList';
import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export default function UpgreadeMembership() {
  return requireAuth(
    <div>
      <div>
        <UpgreadeMembershipList />
      </div>
    </div>,
    [3]
  );
}
