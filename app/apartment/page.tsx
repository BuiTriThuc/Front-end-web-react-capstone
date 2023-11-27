import React from 'react';
import ClientOnly from '../components/ClientOnly';
import ListAparment from './ListAparment';
import GetListApartment from '../actions/getListApartment';
import GetListResort from '../actions/getListResort';
import { AiFillAccountBook } from 'react-icons/ai';
import GetCurrentUser from '../actions/getCurrentUser';

export const metadata = {
  title: 'Apartments',
};

export default async function listResortPage() {
  const listApartment = await GetListApartment();
  const listResort = await GetListResort('0');
  const currentUser = await GetCurrentUser();
  return (
    <ClientOnly>
      <ListAparment
        listApartment={listApartment}
        listResort={listResort}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
