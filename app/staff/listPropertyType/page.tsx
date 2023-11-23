import requireAuth from '@/app/libs/requireAuth';
import React from 'react';
import ListPropertyType from './ListPropertyType';
import GetPropertyTypeStaff from '@/app/actions/getPropertyTypeStaff';

export default async function ListPropertyViewPage() {
  return requireAuth(<ListPropertyType />, [3]);
}
