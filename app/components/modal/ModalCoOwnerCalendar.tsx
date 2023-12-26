'use client';

import useAparmentAmenitiesModal from '@/app/hooks/useApartmentAmenitiesModal';
import React, { useState } from 'react';
import ModalBaseDetail from './ModalBaseDetail';
import Image from 'next/image';
import { Button, Calendar, Modal, Space } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { addDays, subDays } from 'date-fns';
import type { Dayjs } from 'dayjs';

import type { CalendarProps } from 'antd';
import { DateRange, DateRangePicker } from 'react-date-range';
const ModalCoOwnerCalendar = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  return (
    <>
      <Space>
        <Button type="link" onClick={showModal} icon={<ExportOutlined />}></Button>
      </Space>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        // width={750}
      >
        <div>
          <DateRange
            dateDisplayFormat="yyyy-MM-dd"
            editableDateInputs={true}
            onChange={(item: any) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            months={2}
            direction="horizontal"
            className="w-[100%] !text-[1em]"
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalCoOwnerCalendar;
