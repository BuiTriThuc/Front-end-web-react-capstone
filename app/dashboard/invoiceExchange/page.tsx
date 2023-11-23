import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export default function InvoiceExchange() {
  return requireAuth(<div>InvoiceExchange</div>, [2, 4]);
}
