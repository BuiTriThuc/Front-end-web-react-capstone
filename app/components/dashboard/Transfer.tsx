'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { message, Steps, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Select } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Money = [
  {
    title: 'First',
    content: (
      currentUser: any,
      filteredMemberships: any,
      userTo: any,
      userToEmail: any,
      moneyTranfer: any,
      handleChangeUserTo: (value: any) => void,
      handleChangeMoneyTranfer: (value: any) => void
    ) => (
      <div className="mt-10 py-5 w-full bg-white flex flex-row items-center justify-center border border-gray-300 rounded-md">
        <div>
          <div>
            <h1 className="font-bold mb-2 ">Source account</h1>
            <input
              className="w-[500px] rounded-md"
              value={currentUser?.username}
              readOnly
              type="text"
            />
          </div>
          <div className="mt-5">
            <h1 className="font-bold mb-2 ">
              Accounts get <span className="text-red-500">*</span>
            </h1>
            <Select
              value={userTo}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeUserTo(e.target.value)}
              required
            >
              {filteredMemberships?.map((item: any, index: number) => (
                <option key={item.userId} value={item.userId}>
                  {item.username}
                </option>
              ))}
            </Select>
          </div>
          <div className="my-5">
            <h1 className="font-bold mb-2  ">
              Number of points to transfer <span className="text-red-500">*</span>
            </h1>
            <input
              className="w-[500px] rounded-md"
              type="text"
              value={moneyTranfer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeMoneyTranfer(e.target.value)
              }
              required
            />
          </div>
          {/* <div>
            <h1 className="font-bold mb-2 ">Content</h1>
            <textarea className="rounded-md" name="" id="" cols={57} rows={2}></textarea>
          </div> */}
        </div>
      </div>
    ),
  },
  {
    title: 'Finish',
    content: (
      currentUser: any,
      filteredMemberships: any,
      userTo: any,
      userToEmail: any,
      moneyTranfer: any,
      handleChangeUserTo: (value: any) => void,
      handleChangeMoneyTranfer: (value: any) => void
    ) => (
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
                <div className="text-gray-400">{moneyTranfer}</div>
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
                <div className="text-gray-400">{moneyTranfer}</div>
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
  // {
  //   title: 'Third',
  //   content: (
  //     <div className="mt-10 py-5 w-full bg-white flex flex-col items-center justify-center border border-gray-300 rounded-md">
  //       <div>
  //         <div>
  //           Please enter the OTP code sent to your email <span>hungpd7150701@gmail.com</span>
  //         </div>
  //         <div className="flex flex-row items-center gap-5 mt-5 ">
  //           <input className="rounded-md px-2 " type="number" />
  //           <button className="text-white px-5 py-2 rounded-md bg-common hover:bg-blue-600">
  //             Accuracy
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   ),
  // },
];

interface TranferMoneyProps {
  currentUser: any;
  memberships: any;
}

const TransferMoney: React.FC<TranferMoneyProps> = ({ currentUser, memberships }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [userTo, setUserTo] = useState<any>();
  const [userToEmail, setUserToEmail] = useState<any>();
  const [moneyTranfer, setMoneyTranfer] = useState<any>(0);
  const { data: session } = useSession();
  const router = useRouter();

  const next = () => {
    if (!userTo || !moneyTranfer) {
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
      amount: moneyTranfer,
    };

    const config = {
      headers: { Authorization: `Bearer ${session?.user.access_token}` },
      'Content-type': 'application/json',
    };

    axios
      .post('https://holiday-swap.click/api/v1/transfer', data, config)
      .then(() => {
        toast.success('Transfer point success!');
        setTimeout(() => {
          router.push('/dashboard/wallet');
        }, 3000);
      })
      .catch((response) => {
        toast.error(response.response.data.message);
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

  const handleChangeMoneyTranfer = (value: any) => {
    setMoneyTranfer(value);
  };

  useEffect(() => {
    if (userTo && session?.user.access_token) {
      const fetchEmail = async () => {
        const userToEmail = await axios.get(`https://holiday-swap.click/api/v1/users/${userTo}`);

        if (userToEmail) {
          setUserToEmail(userToEmail.data.email);
        }
      };
      fetchEmail();
    }
  }, [userTo, session?.user.access_token]);

  console.log('Check email', userToEmail);

  return (
    <>
      <Steps current={current} items={items} />
      <div>
        {Money[current].content(
          currentUser,
          filteredMemberships,
          userTo,
          userToEmail,
          moneyTranfer,
          handleChangeUserTo,
          handleChangeMoneyTranfer
        )}
      </div>
      <div style={{ marginTop: 24 }}>
        {current < Money.length - 1 && (
          <button className="bg-common px-5 py-2 rounded-md text-white" onClick={() => next()}>
            Next
          </button>
        )}
        {current === Money.length - 1 && (
          <Link
            href="./wallet"
            className="bg-common px-5 py-2 rounded-md text-white"
            onClick={handleDone}
          >
            Done
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