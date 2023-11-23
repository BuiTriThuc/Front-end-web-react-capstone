import requireAuth from '@/app/libs/requireAuth';
import React from 'react';

export default function Invoices() {
  return requireAuth(<div>Invoices</div>, [2, 4]);
}
