'use client';

import HeadingDashboard from '@/app/components/HeadingDashboard';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Fragment } from 'react';
import { Button, Label, Table, TextInput } from 'flowbite-react';

interface IssueProps {
  issue: any;
}

const Issue: React.FC<IssueProps> = ({ issue }) => {
  const router = useRouter();

  const [searchName, setSearchName] = React.useState<string>('');
  const [filteredIssues, setFilteredIssues] = React.useState<any[]>(issue);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Filter issues based on the entered bookingId
    const filtered = issue.filter((item: any) => item?.bookingId?.toString().includes(searchName));
    setFilteredIssues(filtered);
  };

  return (
    <Fragment>
      <div className="mt-12">
        <HeadingDashboard
          routerDashboard="/staff"
          pageCurrentContent="Issue booking"
          pageCurrentRouter="/staff/issue"
        />
      </div>

      <div className="pb-6 pt-4">
        <form onSubmit={handleSearch}>
          <Label
            htmlFor="searchName"
            value="Search Booking ID: "
            className="mx-1 inline-block align-middle"
          />
          <div className="flex">
            <TextInput
              name="searchName"
              type="text"
              className="mx-1"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>

      <div className="py-6">
        {filteredIssues && filteredIssues.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell className="w-[200px]">Booking ID</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Created on</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredIssues.map((item: any, index: any) => (
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.id}
                  </Table.Cell>
                  <Table.Cell>{item.bookingId}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{format(new Date(item?.createdOn), 'dd/MM/yyyy')}</Table.Cell>
                  <Table.Cell className="text-green-500 font-bold">{item.status}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <div
                        onClick={() => router.push(`/staff/issue/${item.id}`)}
                        className="font-medium text-cyan-600 hover:underline hover:cursor-pointer dark:text-cyan-500"
                      >
                        View detail
                      </div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div>
            <div className="text-[25px] font-bold">No issue booking!</div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Issue;