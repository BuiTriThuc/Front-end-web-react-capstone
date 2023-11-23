import ExchangeReview from '@/app/components/dashboard/ExchangeReview';
import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export default function ReviewExchange() {
  return requireAuth(
    <div>
      <div>
        Dashboard {'>'} <span className="text-common">Review Exchange</span>
      </div>
      <div>
        <ExchangeReview />
      </div>
    </div>,
    [2, 4]
  );
}
