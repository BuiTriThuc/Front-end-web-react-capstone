import requireAuth from '@/app/libs/requireAuth';
import React from 'react';
import ListPropertyView from './ListPropertyView';
import GetPropertyViewStaff from '@/app/actions/getPropertyViewStaff';

export default async function ListPropertyViewPage() {
  const propertyViews = await GetPropertyViewStaff();
  return requireAuth(<ListPropertyView propertyViews={propertyViews} />, [3]);
}
