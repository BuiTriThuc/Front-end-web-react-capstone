import ListPropertyResort from '@/app/components/staff/ListPropertyResort';
import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export default function ListPropertyInResort() {
  return requireAuth(
    <div>
      <div className="mt-8 mb-10">
        <div>
          Staff {'> '}
          <span className="text-common">listpropertyinresort</span>
        </div>
      </div>
      <div>
        <ListPropertyResort />
      </div>
    </div>,
    [3]
  );
}
