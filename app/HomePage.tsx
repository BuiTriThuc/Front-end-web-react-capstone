'use client';

import React, { useEffect, useState } from 'react';
import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import Banner from './components/banner/Banner';
import TopDestination from './components/TopDestination';
import TopApartment from './components/TopApartment';
import { useSession } from 'next-auth/react';

const HomePage = () => {
  return (
    <ClientOnly>
      <Container>
        <div className='pt-32 xl:px-9'>
          <div className='grid md:grid-cols-2 grid-cols-1'>
            <Banner />
          </div>
          <TopDestination />
          <TopApartment />
        </div>
      </Container>
    </ClientOnly>
  );
};

export default HomePage;
