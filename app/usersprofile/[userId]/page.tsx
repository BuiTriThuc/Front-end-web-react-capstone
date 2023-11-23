import GetUserById from '@/app/actions/getUserById';
import UsersProfileComponent from '@/app/components/usersprofile/UsersProfileComponent';
import React from 'react';

interface IParams {
  userId: string;
}

export default async function UsersProfile({ params }: { params: IParams }) {
  const userDetail = await GetUserById(params);
  console.log('User', userDetail);

  return <UsersProfileComponent userDetail={userDetail} />;
}
