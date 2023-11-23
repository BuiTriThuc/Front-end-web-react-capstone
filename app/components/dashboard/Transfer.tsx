'use client';
import { Steps, Select, Input } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Money = [
  {
    title: 'First',
    content: ({
      currentUser,
      filteredMemberships,
      userTo,
      moneyTransfer,
      handleChangeUserTo,
      handleChangeMoneyTransfer,
    }: {
      currentUser: any;
      filteredMemberships: any;
      userTo: any;
      moneyTransfer: any;
      handleChangeUserTo: (value: any) => void;
      handleChangeMoneyTransfer: (value: any) => void;
    }) => (
      <div className="mt-10 py-5 w-full bg-white flex flex-row items-center justify-center border border-gray-300 rounded-md">
        <div>
          <div>
            <div className="font-bold mb-2 ">Source account</div>
            <Input
              className="w-[500px] rounded-md text-gray-400"
              value={currentUser?.username}
              readOnly
              type="text"
            />
          </div>
          <div className="mt-5">
            <div className="font-bold mb-2 ">
              Account to receive <span className="text-red-500">*</span>
            </div>

            <Select
              className="w-full h-[44px] border border-gray-400 rounded-md text-black font-bold"
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={(value: string) => handleChangeUserTo(value)}
              filterOption={(input: string, option?: { children: string }) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {filteredMemberships?.map((item: any) => (
                <Select.Option key={item.userId} value={item.userId}>
                  {item.username}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="my-5">
            <div className="font-bold mb-2  ">
              Number of points to transfer <span className="text-red-500">*</span>
            </div>
            <Input
              className="w-[499 px] rounded-md"
              type="text"
              value={moneyTransfer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeMoneyTransfer(e.target.value)
              }
              required
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Finish',
    content: ({
      currentUser,
      userToEmail,
      moneyTransfer,
    }: {
      currentUser: any;
      userToEmail: any;
      moneyTransfer: any;
    }) => (
      <>
        <div className="mt-10 py-5 w-full bg-white flex flex-col items-center justify-center border border-gray-300 rounded-md">
          <div className="flex flex-row items-center gap-3">
            <div className="bg-blue-100 w-[500px] px-3 py-3 rounded-md">
              <div className="text-[25px] text-common font-bold">Money transfer account</div>
              <div className="flex fle-row py-5 items-center justify-between">
                <div>Account type</div>
                <div className="text-gray-400">HolidaySwap</div>
              </div>
              <div className="flex fle-row items-center justify-between">
                <div>Account email</div>
                <div className="text-gray-400">{currentUser.email}</div>
              </div>
              <div className="flex fle-row py-5 items-center justify-between">
                <div>Number of points transferred</div>
                <div className="text-gray-400">{moneyTransfer}</div>
              </div>
            </div>
            <div className="bg-blue-100 w-[500px] px-3 py-3 rounded-md">
              <div className="text-[25px] text-common font-bold">Receive account</div>
              <div className="flex fle-row py-5 items-center justify-between">
                <div>Account type</div>
                <div className="text-gray-400">HolidaySwap</div>
              </div>
              <div className="flex fle-row items-center justify-between">
                <div>Account email</div>
                <div className="text-gray-400">{userToEmail}</div>
              </div>
              <div className="flex fle-row py-5 items-center justify-between">
                <div>Number of points received</div>
                <div className="text-gray-400">{moneyTransfer}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-5 gap-1">
            <input type="checkbox" />
            <div>I have read and agree to HolidaySwap&apos;s money transfer terms</div>
          </div>
        </div>
      </>
    ),
  },
];

interface TransferMoneyProps {
  currentUser: any;
  memberships: any;
}

const TransferMoney: React.FC<TransferMoneyProps> = ({ currentUser, memberships }) => {
  const [current, setCurrent] = useState(0);
  const [userTo, setUserTo] = useState<any>();
  const [userToEmail, setUserToEmail] = useState<any>();
  const [moneyTransfer, setMoneyTransfer] = useState<any>(0);
  const { data: session } = useSession();
  const router = useRouter();

  const next = () => {
    if (!userTo || !moneyTransfer) {
      return null;
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = Money.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handleDone = () => {
    const data = {
      from: currentUser?.userId,
      to: userTo,
      amount: moneyTransfer,
    };

    const config = {
      headers: { Authorization: `Bearer ${session?.user.access_token}` },
    };

    axios
      .post('https://holiday-swap.click/api/v1/transfer', data, config)
      .then(() => {
        toast.success('Transfer point success!');
        setTimeout(() => {
          router.push('/dashboard/wallet');
        }, 3000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setCurrent(0);
      });
  };

  const filteredMemberships = memberships?.content.filter(
    (member: any) => member?.userId !== currentUser?.userId
  );

  const handleChangeUserTo = (value: any) => {
    setUserTo(value);
  };

  const handleChangeMoneyTransfer = (value: any) => {
    setMoneyTransfer(value);
  };

  useEffect(() => {
    if (userTo) {
      const fetchEmail = async () => {
        try {
          const response = await axios.get(`https://holiday-swap.click/api/v1/users/${userTo}`);
          console.log('Check response', response.data);
          setUserToEmail(response.data.email);
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      };
      fetchEmail();
    }
  }, [userTo]);

  return (
    <>
      <div className="">
        Dashboard {'>'} <span className="text-common">Transfer</span>
      </div>
      <Steps className="mt-5" current={current} items={items} />
      <div>
        {Money[current].content({
          currentUser,
          filteredMemberships,
          userTo,
          userToEmail,
          moneyTransfer,
          handleChangeUserTo,
          handleChangeMoneyTransfer,
        })}
      </div>
      <div style={{ marginTop: 24 }}>
        {current < Money.length - 1 && (
          <button className="bg-common px-5 py-2 rounded-md text-white" onClick={() => next()}>
            Next
          </button>
        )}
        {current === Money.length - 1 && (
          <Link href="/dashboard/wallet">
            <button className="bg-common px-5 py-2 rounded-md text-white" onClick={handleDone}>
              Done
            </button>
          </Link>
        )}
        {current > 0 && (
          <button
            className="bg-common px-5 py-2 rounded-md text-white"
            style={{ margin: '0 8px' }}
            onClick={() => prev()}
          >
            Previous
          </button>
        )}
      </div>
    </>
  );
};

export default TransferMoney;
