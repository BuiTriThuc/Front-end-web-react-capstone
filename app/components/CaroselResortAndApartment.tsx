/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { Avatar, Input, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';
import { MdStar } from 'react-icons/md';
import getListResortForRent from '../actions/getListResortForRent';
import getListApartmentForRent from '../actions/getListApartmentForRent';
import { Col, Divider, Row, Carousel, Image, Card, Pagination } from 'antd';
const { Meta } = Card;
import {
  CalendarOutlined,
  CaretRightOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import GallerySlider from './map/AnyReactComponent/GallerySlider';
interface IPageable {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  totalPages?: number;
  totalElements?: number;
}
interface IPageableAparment {
  pageNo: number;
  pageSize: number;
  totalPages: number;
}
interface IParams {
  locationName?: string;
  checkIn?: string;
  checkOut?: string;
  min?: number;
  max?: number;
  guest?: number;
  numberBedsRoom?: number;
  numberBathRoom?: number;
  listOfInRoomAmenity?: number[];
  listOfPropertyView?: number[];
  listOfPropertyType?: number[];
}

// interface CaroselResortAndApartmentProps {
//   listResort?: any;
// }

const CaroselResortAndApartment: React.FC = ({}) => {
  const route = useRouter();
  const [pageable, setPageable] = useState<IPageable>({
    pageNo: 0,
    pageSize: 5,
    sortBy: 'id',
    sortDirection: 'asc',
  });
  const [params, setParams] = useState<IParams>({
    locationName: undefined,
    checkIn: undefined,
    checkOut: undefined,
    min: undefined,
    max: undefined,
    guest: undefined,
    numberBedsRoom: undefined,
    numberBathRoom: undefined,
    listOfInRoomAmenity: undefined,
    listOfPropertyView: undefined,
    listOfPropertyType: undefined,
  });
  const [listResort, setListResort] = useState([]);
  const [listApartment1, setListApartment1] = useState([]);
  const [listApartment2, setListApartment2] = useState([]);
  const [listApartment3, setListApartment3] = useState([]);
  const [listApartment4, setListApartment4] = useState([]);
  const [listApartment5, setListApartment5] = useState([]);
  const [pageable1, setPageable1] = useState<IPageableAparment>({
    pageNo: 0,
    pageSize: 4,
    totalPages: 0,
  });
  const [pageable2, setPageable2] = useState<IPageableAparment>({
    pageNo: 0,
    pageSize: 4,
    totalPages: 0,
  });
  const [pageable3, setPageable3] = useState<IPageableAparment>({
    pageNo: 0,
    pageSize: 4,
    totalPages: 0,
  });
  const [pageable4, setPageable4] = useState<IPageableAparment>({
    pageNo: 0,
    pageSize: 4,
    totalPages: 0,
  });
  const [pageable5, setPageable5] = useState<IPageableAparment>({
    pageNo: 0,
    pageSize: 4,
    totalPages: 0,
  });

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    loadListResortAndApartment();
  }, [JSON.stringify(pageable)]);
  const fetchListRsForRent = async () => {
    var rsFetchListResort = await getListResortForRent(pageable);
    setListResort(rsFetchListResort.content);
  };
  const fetchListApartment = async (resortId: number, index: number, pageNo: number) => {
    var rsFetchListApartment = await getListApartmentForRent(resortId, {
      pageNo: pageNo,
      pageSize: 4,
      sortBy: '',
      sortDirection: 'asc',
    });
    switch (index) {
      case 0:
        setListApartment1(rsFetchListApartment.content);
        setPageable1({
          ...pageable1,
          totalPages: rsFetchListApartment.totalPages,
          pageNo: rsFetchListApartment.number,
        });
        break;
      case 1:
        setListApartment2(rsFetchListApartment.content);
        setPageable2({
          ...pageable2,
          totalPages: rsFetchListApartment.totalPages,
          pageNo: rsFetchListApartment.number,
        });
        break;
      case 2:
        setListApartment3(rsFetchListApartment.content);
        setPageable3({
          ...pageable3,
          totalPages: rsFetchListApartment.totalPages,
          pageNo: rsFetchListApartment.number,
        });
        break;
      case 3:
        setListApartment4(rsFetchListApartment.content);
        setPageable4({
          ...pageable4,
          totalPages: rsFetchListApartment.totalPages,
          pageNo: rsFetchListApartment.number,
        });
        break;
      case 4:
        setListApartment5(rsFetchListApartment.content);
        setPageable5({
          ...pageable5,
          totalPages: rsFetchListApartment.totalPages,
          pageNo: rsFetchListApartment.number,
        });
        break;
      default:
        break;
    }
  };
  const loadListResortAndApartment = async () => {
    var rsFetchListResort = await getListResortForRent(pageable);
    setListResort(rsFetchListResort.content);
    setPageable({
      ...pageable,
      pageNo: rsFetchListResort.number,
      totalPages: rsFetchListResort.totalPages,
      totalElements: rsFetchListResort.totalElements,
    });

    rsFetchListResort.content.forEach((element: any, index: any) => {
      fetchListApartment(element.resort.id, index, 0);
    });
  };

  const handleRedirectApartmentDetail = (url: string) => {
    // newDateRange.setNew();
    route.push(url);
  };

  return (
    <>
      {listResort?.map((element: any, index: number) => {
        {
          var listApartment: any = [];
          //default pageabble
          var pageable: IPageableAparment = { pageNo: 0, pageSize: 4, totalPages: 0 };
          switch (index) {
            case 0:
              listApartment = listApartment1;
              pageable = pageable1;
              break;
            case 1:
              listApartment = listApartment2;
              pageable = pageable2;
              break;
            case 2:
              listApartment = listApartment3;
              pageable = pageable3;
              break;
            case 3:
              listApartment = listApartment4;
              pageable = pageable4;
              break;
            case 4:
              listApartment = listApartment5;
              pageable = pageable5;
              break;
            default:
              break;
          }
          console.log(listApartment);
        }
        return (
          <div key={index} style={{ width: '100%' }}>
            {pageable.totalPages <= 1 ? (
              <div className="w-3"> </div>
            ) : (
              <div className="flex justify-end">
                {pageable.pageNo + 1 + '/' + pageable.totalPages}
              </div>
            )}
            <div className="mb-4 mt-4">
              <Fragment>
                <Row gutter={0} justify="space-around" align="middle">
                  <Col className="gutter-row" span={4}>
                    <Card
                      hoverable
                      style={{ height: 380 }}
                      cover={
                        <Carousel autoplay>
                          {element.resort.resortImages.map((image: any, index: number) => (
                            <Image key={index} width={'auto'} height={380} src={image.link} />
                          ))}
                        </Carousel>
                      }
                    >
                      <div className="absolute bottom-0 text-white pb-4" style={{ width: 'auto' }}>
                        <div className="text-[14px] uppercase">{element.resort.resortName}</div>
                      </div>
                    </Card>
                  </Col>
                  <Col className="gutter-row">
                    {pageable.pageNo == 0 ? (
                      <div className="w-3"> </div>
                    ) : (
                      <LeftOutlined
                        className="w-3"
                        onClick={() => {
                          var page = pageable.pageNo - 1;
                          fetchListApartment(element.resort.id, index, page);
                        }}
                      />
                    )}
                  </Col>

                  <Col className="gutter-row" span={18}>
                    <Row justify="start" gutter={12}>
                      {listApartment.map((element: any, index: number) => {
                        const startTime = new Date(element.availableTime.startTime);
                        const endTime = new Date(element.availableTime.endTime);
                        return (
                          <Col className="gutter-row" span={6} key={index}>
                            <Card
                              hoverable
                              style={{ height: 380 }}
                              cover={
                                <Carousel>
                                  {element.availableTime.coOwner.property?.propertyImages.map(
                                    (image: any, index: number) => (
                                      <Image
                                        key={index}
                                        width={'100%'}
                                        height={200}
                                        src={image.link}
                                        preview={false}
                                      />
                                    )
                                  )}
                                </Carousel>
                              }
                            >
                              <div
                                onClick={() =>
                                  handleRedirectApartmentDetail(
                                    `/apartment/${element.availableTime.id}?propertyId=${element.coOwnerId.propertyId}&roomId=${element.coOwnerId.roomId}`
                                  )
                                }
                              >
                                <b> {element.availableTime.coOwner.property.propertyName}</b>
                                <Meta
                                  style={{ margin: '1px' }}
                                  avatar={
                                    element.availableTime.coOwner.user.avatar ? (
                                      <Avatar src={element.availableTime.coOwner.user.avatar} />
                                    ) : (
                                      <Avatar>
                                        {element.availableTime.coOwner.user.username}
                                      </Avatar>
                                    )
                                  }
                                  description={
                                    'Owner: ' + element.availableTime.coOwner.user.username
                                  }
                                />
                                <div className="px-3 py-2 ">
                                  <div>
                                    <div className="flex">
                                      <div className="text-[14px]">
                                        {startTime.toLocaleDateString('en-GB')}
                                      </div>
                                      <div className="text-[14px] px-1"> - </div>
                                      <div className="text-[14px]">
                                        {endTime.toLocaleDateString('en-GB')}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="  bottom-0 py-3 flex justify-between">
                                    <div className="flex flex-row items-center">
                                      <div>{element.availableTime.pricePerNight}</div>
                                      <img
                                        className="w-[20px] h-[20px]"
                                        src="/images/coin.png"
                                        alt=""
                                      />
                                      <div className="text-[13px]"> /night</div>
                                    </div>
                                    {element.availableTime.coOwner.property.rating ? (
                                      <div className="flex flex-row items-center">
                                        <div>{element.availableTime.coOwner.property.rating}</div>

                                        <div className="text-[13px]">
                                          <MdStar color="orange" size={20} />
                                        </div>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                  <Col className="gutter-row">
                    {pageable.totalPages - 1 <= pageable.pageNo ? (
                      <div className="w-3"> </div>
                    ) : (
                      <RightOutlined
                        onClick={() => {
                          var page = pageable.pageNo + 1;
                          fetchListApartment(element.resort.id, index, page);
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </Fragment>
            </div>
          </div>
        );
      })}
      <Pagination
        className="py-5"
        simple
        current={pageable.pageNo + 1}
        total={pageable.totalElements}
        pageSize={5}
        onChange={(page, pageSize) => {
          console.log(page - 1);
          setPageable({ ...pageable, pageNo: page - 1 });
        }}
      />
    </>
  );
};

export default CaroselResortAndApartment;
