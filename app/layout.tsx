import './globals.css';
import { Poppins } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import ModalLogin from './components/modal/ModalLogin';
import ToasterProvider from './providers/ToastProvider';
import GetCurrentUser from './actions/getCurrentUser';
import Provider from './components/Provider';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { Suspense } from 'react';
import Loading from './loading';
import ModalDetailProperty from './components/modal/ModalDetailProperty';
import ModalCreatePlan from './components/modal/ModalCreatePlan';
import ModalCreateOwnership from './components/modal/ModalCreateOwnership';
import ModalApartmentAmenities from './components/modal/ModalApartmentAmenities';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';
import ModalEditDateBooking from './components/modal/ModalEditDateBooking';
import ModalEditGuestBooking from './components/modal/ModalEditGuestBooking';
import { DateRangeProvider } from './apartment/DateRangeContext';
import ReduxProvider from '@/app/components/ReduxProvider';
import ModalEditPoint from './components/modal/ModalEditPoint';
import ModalCreatePublicTime from './components/modal/ModalCreatePublicTime';
import ModalApartmentReview from './components/modal/ModalApartmentReview';
import ModalWriteBlog from './components/modal/ModalWriteBlog';
import ModalCreateReview from './components/modal/ModalCreateReview';
import ModalEditPropertyType from './components/modal/ModalEditPropertyType';
import ModalEditPropertyView from './components/modal/ModalEditPropertyView';
import ModalDeletePropertyType from './components/modal/ModalDeletePropertyType';
import ModalEditApartment from './components/modal/ModalEditApartment';
import { GuestProvider } from './apartment/GuestContext';
import ModalDeactiveResort from './components/modal/ModalDeactiveResort';
import ModalMaintanceResort from './components/modal/ModalMaintanceResort';
import ModalEditResortAmenities from './components/modal/ModalEditResortAmenities';
import ModalChangeStatusIssue from './components/modal/ModalChangeStatusIssue';
import GetUserWallet from './actions/getUserWallet';

const font = Poppins({
  subsets: ['latin'],
  weight: '500',
  preload: true,
});

export const metadata = {
  title: {
    default: 'HolidaySwap',
    template: '%s | HolidaySwap',
  },
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await GetCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProvider>
          <Provider>
            <DateRangeProvider>
              <GuestProvider>
                <Header currentUser={currentUser} />
                <Suspense fallback={<Loading />}>
                  <ClientOnly>
                    <ModalDetailProperty />
                    <ModalLogin />
                    <ModalWriteBlog />
                    <ModalCreatePlan />
                    <ModalCreateOwnership />
                    <ModalApartmentAmenities />
                    <ModalEditDateBooking />
                    <ModalEditGuestBooking />
                    <ModalEditPoint />
                    <ModalCreatePublicTime />
                    <ModalApartmentReview />
                    <ModalCreateReview />
                    <ModalEditPropertyType />
                    <ModalEditPropertyView />
                    <ModalDeletePropertyType />
                    <ModalEditApartment />
                    <ModalDeactiveResort />
                    <ModalMaintanceResort />
                    <ModalEditResortAmenities />
                    <ModalChangeStatusIssue />
                    <ToasterProvider />
                  </ClientOnly>

                  {children}
                </Suspense>
                <Footer />
              </GuestProvider>
            </DateRangeProvider>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
