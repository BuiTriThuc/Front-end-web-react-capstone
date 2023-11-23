import ListProperty from '@/app/components/staff/ListProperty';
import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export default function page() {
  return requireAuth(
    <div>
      <div>
        <ListProperty />
      </div>
    </div>,
    [3]
  );
}
