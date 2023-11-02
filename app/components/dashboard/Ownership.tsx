"use client";

import useCreateOwnershipModal from "@/app/hooks/useCreateOwnershipModal";
import { format } from "date-fns";
import { Table } from "flowbite-react";
import Link from "next/link";
import { Fragment, useState } from "react";

const TABLE_HEAD = [
  "Property ID",
  "Room ID",
  "Start date",
  "End date",
  "Type",
  "Status",
  "",
];

interface OwnershipProps {
  ownershipUser?: any;
  resort?: any;
  currentUser?: any;
}

const Ownership: React.FC<OwnershipProps> = ({
  ownershipUser,
  resort,
  currentUser,
}) => {
  const [ownershipUserList, setOwnershipUserList] = useState(ownershipUser);
  const [listResort, setListResort] = useState(resort);
  const createOwnershipModal = useCreateOwnershipModal();

  return (
    <Fragment>
      <div className="text-xl font-bold text-common mb-5">
        Management Ownership
      </div>
      <div className="py-6">
        <button
          onClick={() =>
            createOwnershipModal.onOpen(listResort.content, currentUser)
          }
          className="bg-common py-3 px-5 rounded-lg shadow-md text-white text-lg hover:bg-hover"
        >
          Create plan
        </button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Property ID</Table.HeadCell>
          <Table.HeadCell>Room ID</Table.HeadCell>
          <Table.HeadCell>Start date</Table.HeadCell>
          <Table.HeadCell>End date</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {ownershipUserList?.content.map((item: any, index: number) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{item.id.propertyId}</Table.Cell>
              <Table.Cell>{item.id.roomId}</Table.Cell>
              <Table.Cell>
                {format(new Date(item.startTime), "dd-MM-yyyy")}
              </Table.Cell>
              <Table.Cell>
                {format(new Date(item.endTime), "dd-MM-yyyy")}
              </Table.Cell>
              <Table.Cell>
                {item.type === "DEEDED" ? "DEEDED" : "NOT-DEEDED"}
              </Table.Cell>
              <Table.Cell>
                {item.status === "ACCEPTED" ? (
                  <div className="py-2 px-1 text-sm text-center  bg-slate-200 rounded-md text-green-500">
                    ACCEPTED
                  </div>
                ) : (
                  <div className="py-2 px-1 text-center text-sm bg-slate-200 rounded-md text-rose-600">
                    NOT-ACCEPTED
                  </div>
                )}
              </Table.Cell>
              <Table.Cell>
                <Link
                  href="./editApartment"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  <p>Edit</p>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default Ownership;