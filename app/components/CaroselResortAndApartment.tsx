'use client';
import React, { Fragment, useState } from 'react';
import { message, Steps, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { MdStar } from 'react-icons/md';
import { GrLinkNext } from 'react-icons/gr';
import axios from 'axios';

const Money = [
  {
    title: 'First',
    content: async ({ listResort }: { listResort: any }) => {
      const resort1Id = listResort.content[0].id;

      const data = await axios.get(
        `https://holiday-swap.click/api/v1/apartment-for-rent?resortId=${resort1Id}&guest=1&pageNo=0&pageSize=10&sortBy=id&sortDirection=asc`
      );

      return (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-5 h-[350px]">
          {listResort?.content.slice(0, 1).map((item: any, index: number) => (
            <Fragment key={index}>
              <Link
                href="#"
                className=" border border-gray-300 rounded-md relative cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
              >
                <img className="w-[100%] h-[348px] rounded-md" src="/images/vung-tau.jpg" alt="" />
                <div className="absolute bottom-0 text-white  w-full p-4">
                  <div className="text-[20px] uppercase">{item.resortName}</div>
                  <div className="text-common">exploration {'>'}</div>
                </div>
              </Link>

              {data.data.content.slice(0, 4).map((item: any, index: number) => (
                <Link
                  key={index}
                  href="#"
                  className=" relative border border-gray-300 rounded-md cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
                >
                  <div>
                    <img
                      className="rounded-t-md h-[170px] w-[100%]"
                      src="./images/vung-tau2.jpg"
                      alt=""
                    />
                    <div className="px-3 py-2 ">
                      <div>
                        <div className="font-bold">{item.property.propertyName}</div>
                        <div className="text-[14px] py-1">
                          Owner: <span className="text-gray-500">Kienpt</span>
                        </div>
                        <div className="text-[14px]">1-5 Jan</div>{' '}
                        <div>
                          <div className="flex flex-row items-center">
                            <div>
                              <MdStar color="orange" size={20} />
                            </div>
                            <div className="flex flex-row items-center gap-1 mt-1">
                              <div className="text-[14px]">4.9</div>
                              <div className="text-[13px] text-gray-500">(300+)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 py-3">
                        <div className="flex flex-row items-center">
                          <div>20</div>
                          <img className="w-[20px] h-[20px]" src="/images/coin.png" alt="" />{' '}
                          <div className="text-[13px]"> /night</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Fragment>
          ))}
        </div>
      );
    },
  },
  {
    title: 'Second',
    content: ({ listResort }: { listResort: any }) => {
      return (
        <div className="grid grid-cols-5 gap-5 h-[350px]">
          <Link
            href="#"
            className=" relative border border-gray-300 rounded-md cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
          >
            <div>
              <img
                className="rounded-t-md h-[170px] w-[100%]"
                src="./images/vung-tau6.jpg"
                alt=""
              />
              <div className="px-3 py-2 h-full">
                <div>
                  <div className="font-bold">Garden center view</div>
                  <div className="text-[14px] py-1">
                    Owner: <span className="text-gray-500">Kienpt</span>
                  </div>
                  <div className="text-[14px]">1-5 Jan</div>{' '}
                  <div>
                    <div className="flex flex-row items-center">
                      <div>
                        <MdStar color="orange" size={20} />
                      </div>
                      <div className="flex flex-row items-center gap-1 mt-1">
                        <div className="text-[14px]">4.9</div>
                        <div className="text-[13px] text-gray-500">(300+)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 py-3">
                  <div className="flex flex-row items-center">
                    <div>20</div>
                    <img className="w-[20px] h-[20px]" src="/images/coin.png" alt="" />{' '}
                    <div className="text-[13px]"> /night</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className=" relative border border-gray-300 rounded-md cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
          >
            <div>
              <img
                className="rounded-t-md h-[170px] w-[100%]"
                src="./images/vung-tau7.jpg"
                alt=""
              />
              <div className="px-3 py-2 ">
                <div>
                  <div>Garden center view</div>
                  <div className="text-[14px] py-1">
                    Owner: <span className="text-gray-500">Kienpt</span>
                  </div>
                  <div className="text-[14px]">1-5 Jan</div>{' '}
                  <div>
                    <div className="flex flex-row items-center">
                      <div>
                        <MdStar color="orange" size={20} />
                      </div>
                      <div className="flex flex-row items-center gap-1 mt-1">
                        <div className="text-[14px]">4.9</div>
                        <div className="text-[13px] text-gray-500">(300+)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 py-3">
                  <div className="flex flex-row items-center">
                    <div>20</div>
                    <img className="w-[20px] h-[20px]" src="/images/coin.png" alt="" />{' '}
                    <div className="text-[13px]"> /night</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className=" relative border border-gray-300 rounded-md cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
          >
            <div>
              <img
                className="rounded-t-md h-[170px] w-[100%]"
                src="./images/vung-tau8.jpg"
                alt=""
              />
              <div className="px-3 py-2 h-full">
                <div>Garden center view</div>
                <div className="text-[14px] py-1">
                  Owner: <span className="text-gray-500">Kienpt</span>
                </div>
                <div className="text-[14px]">1-5 Jan</div>{' '}
                <div>
                  <div className="flex flex-row items-center">
                    <div>
                      <MdStar color="orange" size={20} />
                    </div>
                    <div className="flex flex-row items-center gap-1 mt-1">
                      <div className="text-[14px]">4.9</div>
                      <div className="text-[13px] text-gray-500">(300+)</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 py-3">
                  <div className="flex flex-row items-center">
                    <div>20</div>
                    <img className="w-[20px] h-[20px]" src="/images/coin.png" alt="" />{' '}
                    <div className="text-[13px]"> /night</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className=" relative border border-gray-300 rounded-md cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
          >
            <div>
              <img
                className="rounded-t-md h-[170px] w-[100%]"
                src="./images/vung-tau2.jpg"
                alt=""
              />
              <div className="px-3 py-2 h-full">
                <div>Garden center view</div>
                <div className="text-[14px] py-1">
                  Owner: <span className="text-gray-500">Kienpt</span>
                </div>
                <div className="text-[14px]">1-5 Jan</div>{' '}
                <div>
                  <div className="flex flex-row items-center">
                    <div>
                      <MdStar color="orange" size={20} />
                    </div>
                    <div className="flex flex-row items-center gap-1 mt-1">
                      <div className="text-[14px]">4.9</div>
                      <div className="text-[13px] text-gray-500">(300+)</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 py-3">
                  <div className="flex flex-row items-center">
                    <div>20</div>
                    <img className="w-[20px] h-[20px]" src="/images/coin.png" alt="" />{' '}
                    <div className="text-[13px]"> /night</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="border border-gray-300 rounded-md relative cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500 flex flex-col justify-center items-center"
          >
            <img className="w-[100%] h-[348px] rounded-md" src="/images/vung-tau.jpg" alt="" />
            <div className="absolute text-white w-full p-4 flex flex-col items-center">
              <div className="rounded-full p-6 bg-gray-100 opacity-60  mt-4">
                <GrLinkNext color="orange" size={30} />
              </div>
              <div className="text-common">exploration </div>
              <div className="text-[20px] uppercase">Vung Bau resort</div>
            </div>
          </Link>
        </div>
      );
    },
  },
  {
    title: 'Third',
    content: ({ listResort }: { listResort: any }) => {
      return (
        <div className="grid grid-cols-5 gap-5 h-[350px]">
          <Link
            href="#"
            className=" relative border border-gray-300 rounded-md cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
          >
            <div>
              <img
                className="rounded-t-md h-[170px] w-[100%]"
                src="./images/vung-tau6.jpg"
                alt=""
              />
              <div className="px-3 py-2 h-full">
                <div>
                  <div className="font-bold">Garden center view</div>
                  <div className="text-[14px] py-1">
                    Owner: <span className="text-gray-500">Kienpt</span>
                  </div>
                  <div className="text-[14px]">1-5 Jan</div>{' '}
                  <div>
                    <div className="flex flex-row items-center">
                      <div>
                        <MdStar color="orange" size={20} />
                      </div>
                      <div className="flex flex-row items-center gap-1 mt-1">
                        <div className="text-[14px]">4.9</div>
                        <div className="text-[13px] text-gray-500">(300+)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 py-3">
                  <div className="flex flex-row items-center">
                    <div>20</div>
                    <img className="w-[20px] h-[20px]" src="/images/coin.png" alt="" />{' '}
                    <div className="text-[13px]"> /night</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className=" relative border border-gray-300 rounded-md cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
          >
            <div>
              <img
                className="rounded-t-md h-[170px] w-[100%]"
                src="./images/vung-tau7.jpg"
                alt=""
              />
              <div className="px-3 py-2 ">
                <div>
                  <div>Garden center view</div>
                  <div className="text-[14px] py-1">
                    Owner: <span className="text-gray-500">Kienpt</span>
                  </div>
                  <div className="text-[14px]">1-5 Jan</div>{' '}
                  <div>
                    <div className="flex flex-row items-center">
                      <div>
                        <MdStar color="orange" size={20} />
                      </div>
                      <div className="flex flex-row items-center gap-1 mt-1">
                        <div className="text-[14px]">4.9</div>
                        <div className="text-[13px] text-gray-500">(300+)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 py-3">
                  <div className="flex flex-row items-center">
                    <div>20</div>
                    <img className="w-[20px] h-[20px]" src="/images/coin.png" alt="" />{' '}
                    <div className="text-[13px]"> /night</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className=" relative border border-gray-300 rounded-md cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
          >
            <div>
              <img
                className="rounded-t-md h-[170px] w-[100%]"
                src="./images/vung-tau8.jpg"
                alt=""
              />
              <div className="px-3 py-2 h-full">
                <div>Garden center view</div>
                <div className="text-[14px] py-1">
                  Owner: <span className="text-gray-500">Kienpt</span>
                </div>
                <div className="text-[14px]">1-5 Jan</div>{' '}
                <div>
                  <div className="flex flex-row items-center">
                    <div>
                      <MdStar color="orange" size={20} />
                    </div>
                    <div className="flex flex-row items-center gap-1 mt-1">
                      <div className="text-[14px]">4.9</div>
                      <div className="text-[13px] text-gray-500">(300+)</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 py-3">
                  <div className="flex flex-row items-center">
                    <div>20</div>
                    <img className="w-[20px] h-[20px]" src="/images/coin.png" alt="" />{' '}
                    <div className="text-[13px]"> /night</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className=" relative border border-gray-300 rounded-md cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500"
          >
            <div>
              <img
                className="rounded-t-md h-[170px] w-[100%]"
                src="./images/vung-tau2.jpg"
                alt=""
              />
              <div className="px-3 py-2 h-full">
                <div>Garden center view</div>
                <div className="text-[14px] py-1">
                  Owner: <span className="text-gray-500">Kienpt</span>
                </div>
                <div className="text-[14px]">1-5 Jan</div>{' '}
                <div>
                  <div className="flex flex-row items-center">
                    <div>
                      <MdStar color="orange" size={20} />
                    </div>
                    <div className="flex flex-row items-center gap-1 mt-1">
                      <div className="text-[14px]">4.9</div>
                      <div className="text-[13px] text-gray-500">(300+)</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 py-3">
                  <div className="flex flex-row items-center">
                    <div>20</div>
                    <img className="w-[20px] h-[20px]" src="/images/coin.png" alt="" />{' '}
                    <div className="text-[13px]"> /night</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="border border-gray-300 rounded-md relative cursor-pointer hover:-translate-y-2 hover:duration-500 translate-y-0 duration-500 flex flex-col justify-center items-center"
          >
            <img className="w-[100%] h-[348px] rounded-md" src="/images/vung-tau.jpg" alt="" />
            <div className="absolute text-white w-full p-4 flex flex-col items-center">
              <div className="rounded-full p-6 bg-gray-100 opacity-60  mt-4">
                <GrLinkNext color="orange" size={30} />
              </div>
              <div className="text-common">exploration </div>
              <div className="text-[20px] uppercase">Vung Bau resort</div>
            </div>
          </Link>
        </div>
      );
    },
  },
];

interface CaroselResortAndApartmentProps {
  listResort: any;
}

const CaroselResortAndApartment: React.FC<CaroselResortAndApartmentProps> = ({ listResort }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  console.log('Check resort', listResort);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = Money.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div>
      <div className="w-full flex flex-row justify-end mb-5">
        <div className="mt-6 ">
          {current > 0 && (
            <button
              className="bg-common px-2  rounded-full text-white"
              style={{ margin: '0 8px' }}
              onClick={() => prev()}
            >
              {'<'}
            </button>
          )}
          {current < Money.length - 1 && (
            <button className="bg-common px-2  rounded-full text-white" onClick={() => next()}>
              {'>'}
            </button>
          )}
        </div>
      </div>

      <div>{Money[current].content({ listResort })}</div>
    </div>
  );
};

export default CaroselResortAndApartment;
