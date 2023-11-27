// DateRangeContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface DateRangeContextType {
  dateRangeContext: DateRange;
  dateRangeDefaultContext: DateRange;
  setDateRangeContext: (dateRange: any) => void;
  setDateRangeDefaultContext: (dateRange: any) => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
}

interface DateRangeProviderProps {
  children: ReactNode;
}

export function DateRangeProvider({ children }: DateRangeProviderProps) {
  const [dateRangeContext, setDateRangeContext] = useState<any>(null);
  const [dateRangeDefaultContext, setDateRangeDefaultContext] = useState<any>(null);

  return (
    <DateRangeContext.Provider
      value={{
        dateRangeContext,
        dateRangeDefaultContext,
        setDateRangeContext,
        setDateRangeDefaultContext,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}
