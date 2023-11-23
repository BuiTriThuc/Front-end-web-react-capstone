'use client';

import React, { Fragment, useCallback, useState } from 'react';
import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { BsClipboard2PlusFill } from 'react-icons/bs';
import useCreatePlanModal from '@/app/hooks/useCreatePlanModal';
import { Table } from 'flowbite-react';
import SelectRouterAdmin from './SelectRouterAdmin';

const TABLE_HEAD = [
  'ID',
  'Plane Name',
  'Description',
  'Price',
  'Price Type',
  'Plan Price Interval',
  'Status',
  '',
];

interface PlanProps {
  plan?: any;
}

const Plan: React.FC<PlanProps> = ({ plan }) => {
  const [planList, setPlanList] = useState<any>(plan);
  const createPlanModal = useCreatePlanModal();

  return (
    <Fragment>
      <div className="mt-10">
        Dashboard {'>'} <span className="text-common">Plan</span>
      </div>
      <SelectRouterAdmin />
      <div className="text-xl font-bold text-common  py-5">Management Plan</div>
      <div className="">
        <button
          onClick={createPlanModal.onOpen}
          className="bg-common py-3 mb-5 px-5 rounded-lg shadow-md text-white text-lg hover:bg-hover"
        >
          Create plan
        </button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Plane Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Price Type</Table.HeadCell>
          <Table.HeadCell>Plan Price Interval</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {planList?.map((item: any, index: number) => {
            return (
              <Table.Row
                key={item.planId}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{item.planId}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.planName}
                </Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.priceType}</Table.Cell>
                <Table.Cell>{item.planPriceInterval}</Table.Cell>
                <Table.Cell>
                  {item.active === true ? (
                    <div className="py-2 px-1 text-sm text-center  bg-slate-200 rounded-md text-green-500">
                      Active
                    </div>
                  ) : (
                    <div className="py-2 px-1 text-center text-sm bg-slate-200 rounded-md text-rose-600">
                      In-Active
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <p>Edit</p>
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default Plan;
