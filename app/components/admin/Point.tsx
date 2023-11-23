'use client';

import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { format } from 'date-fns';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Table } from 'flowbite-react';
import useEditPointModal from '@/app/hooks/useEditPointModal';
import TooltipCreatePoint from './tooltip/TooltipCreatePoint';
import SelectRouterAdmin from './SelectRouterAdmin';
const TABLE_HEAD = ['ID', 'Point Price', 'Created Date', 'Status', ''];

interface PointProps {
  point: any;
}

const Point: React.FC<PointProps> = ({ point }) => {
  const [listPoint, setListPoint] = useState<any>(point);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState<string>();
  const axiosAuthClient = useAxiosAuthClient();

  useEffect(() => {
    const fetchData = async () => {
      const point = await axios.get(`https://holiday-swap.click/api/v1/point`);

      if (!point) {
        return null;
      }

      setListPoint(point.data);
    };
    fetchData();
  }, []);

  const handleCreatePrice = async () => {
    setIsLoading(true);
    axiosAuthClient
      .post(`/point/create?price=${price}`)
      .then(async (response) => {
        toast.success('Create point success');
        setPrice('');
        const newPoint = await axiosAuthClient.get('/point');
        setListPoint(newPoint.data);
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const editPointModal = useEditPointModal();

  let VietnamDong = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <Fragment>
      <div className="mt-10">
        Dashboard {'>'} <span className="text-common">Point</span>
      </div>
      <SelectRouterAdmin />
      <div className="text-xl font-bold text-common py-5">Management Point</div>
      <div>
        <label className="font-bold">Point Price</label>
        <div className="flex flex-row items-center my-3">
          <div>
            1 point<span className="text-common font-bold mx-2">=</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input
              value={price}
              placeholder="Input point price"
              onChange={(e) => setPrice(e.target.value)}
              className="peer px-2 py-2 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
            />
            <TooltipCreatePoint />
          </div>
        </div>
        <button
          disabled={isLoading}
          onClick={handleCreatePrice}
          className="bg-common py-3 my-5 px-5 rounded-lg shadow-md text-white text-lg hover:bg-hover"
        >
          Save
        </button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Point ID</Table.HeadCell>
          <Table.HeadCell>Point Price</Table.HeadCell>
          <Table.HeadCell>Created Date</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              1 {/* {listPoint?.id} */}
            </Table.Cell>
            <Table.Cell>{VietnamDong.format(listPoint?.pointPrice)}</Table.Cell>
            <Table.Cell>
              {(() => {
                if (listPoint?.pointCreatedDate) {
                  const date = listPoint?.pointCreatedDate as string;
                  const newDate = date.split(' ')[0] as string;
                  return <div>{format(new Date(newDate), 'dd-MM-yyyy')}</div>;
                }
              })()}
            </Table.Cell>
            <Table.Cell>{listPoint?.pointStatus}</Table.Cell>
            <Table.Cell>
              <button
                onClick={editPointModal.onOpen}
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Update
              </button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default Point;
