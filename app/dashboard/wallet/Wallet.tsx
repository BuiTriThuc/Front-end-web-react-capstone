'use client';

import HistoryPayment from '@/app/components/wallet/HistoryPayment';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BiWallet } from 'react-icons/bi';

interface WalletProps {
  userWallet?: any;
  transfer?: any;
  historyTransaction: any;
}

const Wallet: React.FC<WalletProps> = ({ userWallet, transfer, historyTransaction }) => {
  const router = useRouter();
  const numberTopup = historyTransaction?.filter(
    (item: any) => item.message.includes('Admin') && item.status === 'SUCCESS'
  ).length;
  return (
    <div>
      <div className="">
        Dashboard {'>'} <span className="text-common">My Wallet</span>
      </div>
      <div className="flex flex-col px-10 w-full items-center">
        <div className="bg-white w-full rounded-3xl h-auto px-5 py-8 shadow-xl mt-10">
          <div className="flex flex-row items-center gap-60 justify-between">
            <div className="flex flex-row items-center">
              <div className="pr-10">
                <BiWallet size={100} color="#5C98F2" />
              </div>
              <div className="flex flex-col">
                <div className="text-[30px]">Account balance</div>
                <div className="flex flex-row items-center">
                  <img className="w-[50px] h-[50px]" src="/images/coin.png" alt="" />
                  <div className="text-[30px] ml-1 font-bold">
                    {userWallet?.totalPoint.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                onClick={() => router.push('/recharge')}
                className="bg-common text-white px-5 py-2 rounded-md cursor-pointer hover:bg-blue-600"
              >
                Recharge
              </div>
            </div>
          </div>
          <div className="w-full h-[5px] bg-[#24ADEC] rounded-3xl my-5"></div>
          <div className="flex flex-row items-center justify-around w-full">
            <div>
              <div className="flex flex-row items-center">
                <div className="bg-[#f1e4f1] w-auto h-auto rounded-lg px-5 py-3 flex flex-row items-center">
                  <div className="bg-white rounded-full w-11 h-11 flex flex-col justify-center items-center mr-[10px]">
                    <div className="text-[25px] text-[#e6abe6]">{numberTopup}</div>
                  </div>
                  <div className="flex flex-col">
                    <div>Number of top-up</div>
                    <div className="text-gray-500">
                      Total: <span>200k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center">
                <div className="bg-[#e4f1ef] w-auto h-auto rounded-lg px-5 py-3 flex flex-row items-center">
                  <div className="bg-white rounded-full w-11 h-11 flex flex-col justify-center items-center mr-[10px]">
                    <div className="text-[25px] text-[#b0e0d8]">4</div>
                  </div>
                  <div className="flex flex-col">
                    <div>Number of payments</div>
                    <div className="text-gray-500 flex flex-row items-center">
                      <div>Total: </div>
                      <span className="flex flex-row items-center ml-1">
                        <img className="w-[15px] h-[15px]" src="/images/coin.png" alt="" />
                        400
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center">
                <div className="bg-[#eff1e4] w-auto h-auto rounded-lg px-5 py-3 flex flex-row items-center">
                  <div className="bg-white rounded-full w-11 h-11 flex flex-col justify-center items-center mr-[10px]">
                    <div className="text-[25px] ">{transfer?.length}</div>
                  </div>
                  <div className="flex flex-col">
                    <div>Number of transfer</div>
                    {/* <div className="text-gray-500">
                      Total: <span>200k</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 w-[1000px] rounded-b-3xl h-auto px-5 py-4 shadow-xl"></div>
        <div className="bg-gray-300 w-[900px] rounded-b-3xl h-auto px-5 py-4 shadow-xl"></div>
      </div>
      <div className="px-10">
        <div className="mt-16 text-[25px]  text-common font-bold">Wallet History</div>
        <div className="w-full">
          <HistoryPayment historyTransaction={historyTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
