'use client';

import React, { useEffect, useState } from 'react';
import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import Banner from './components/banner/Banner';
import TopDestination from './components/TopDestination';
import TopApartment from './components/TopApartment';

interface HomePageProps {
  listResort: any;
}

const HomePage: React.FC<HomePageProps> = ({ listResort }) => {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [isTokenFound, setTokenFound] = useState(false);
  const [currentToken, setCurrentToken] = useState<any>();

  return (
    <ClientOnly>
      <Container>
        <div className="pt-32 xl:px-9">
          <div className="grid md:grid-cols-2 grid-cols-1">
            <Banner listResort={listResort} />
          </div>
          <TopDestination listResort={listResort} />
          <TopApartment />
        </div>
      </Container>
    </ClientOnly>
  );
};

export default HomePage;
