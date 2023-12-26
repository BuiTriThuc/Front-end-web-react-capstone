/* eslint-disable jsx-a11y/alt-text */
'use client';
import {
  Avatar,
  Card,
  Carousel,
  Col,
  Image,
  Rate,
  Row,
  Statistic,
  Tag,
  Button,
  List,
  Skeleton,
  Table,
} from 'antd';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import EditPublicTime from '../managementApartment/EditPublicTime';
import { BiBlock } from 'react-icons/bi';
import { Upload } from 'antd';
import useCreatePublicTimeModal from '@/app/hooks/useCreatePublicTimeModal';
import useEditApartmentModal from '@/app/hooks/useEditApartmentModal';
import { lastIndexOf } from 'lodash';
import { format } from 'date-fns';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import GetApproveOwnershipById from '@/app/actions/getApproveOwnershipById';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { Modal, Tooltip } from 'flowbite-react';
import {
  ArrowUpOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import ModalCoOwnerCalendar from '../modal/ModalCoOwnerCalendar';
import getAvailableTimeByCoOwnerId from '@/app/actions/getAvailableTimeByCoOwnerId';
import ModalViewImageContractCoOwner from '../modal/ModalViewImageContractCoOwner';

interface ManageApartmentProps {
  detailCoOwner: any;
  propertyDetail: any;
  slug: any;
}
const ManageApartment: React.FC<ManageApartmentProps> = ({
  detailCoOwner,
  propertyDetail,
  slug,
}) => {
  const [detail, setDetail] = useState(detailCoOwner);
  const [availableTime, setAvailableTime] = useState<any[]>([]);

  const [isOpenTimePublic, setIsOpenTimePublic] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [switchActive, setSwitchActive] = useState(true);
  const createModalPublicTime = useCreatePublicTimeModal();
  const isCreated = createModalPublicTime.isCreated;
  const axiosAuthClient = useAxiosAuthClient();

  useEffect(() => {
    if (isCreated === true) {
      const getData = async () => {
        const detailCoOwner = await GetApproveOwnershipById({ slug });
        if (detailCoOwner) {
          setDetail(detailCoOwner);
          createModalPublicTime.onCreatedReset();
        }
      };
      getData();
    }
  }, [isCreated, createModalPublicTime]);

  const [isOpenTimePublicArr, setIsOpenTimePublicArr] = useState(
    new Array(detailCoOwner.timeFrames.length).fill(false)
  );
  useEffect(() => {
    fetchAvailableTimeByCoOwnerId();
  }, []);
  const fetchAvailableTimeByCoOwnerId = async () => {
    var rs = await getAvailableTimeByCoOwnerId({
      coOwnerId: slug,
      pageNo: 0,
      pageSize: 10,
      sortDirection: 'asc',
      sortBy: 'id',
    });
    setAvailableTime(rs.content);
  };
  // Function to toggle isOpenTimePublic for a specific index
  const toggleIsOpenTimePublic = (index: number) => {
    const updatedArr = [...isOpenTimePublicArr];
    updatedArr[index] = !updatedArr[index];
    setIsOpenTimePublicArr(updatedArr);
  };

  const handleDeleteAvailableTime = (id: string) => {
    if (id) {
      axiosAuthClient
        .delete(`available-times/${id}`)
        .then(async () => {
          toast.success('Delete public time successfully!');
          const detailCoOwner = await GetApproveOwnershipById({ slug });
          if (detailCoOwner) {
            setDetail(detailCoOwner);
          }
          setOpenModal(false);
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        })
        .finally(() => {
          setOpenModal(false);
        });
    }
  };
  const arr = [1, 2, 3, 4];
  return (
    <div>
      <Image.PreviewGroup>
        <div className="py-3">
          <div className="flex flex-row gap-3 w-full">
            <div className="w-full">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Card
                    title={detail.property.propertyName}
                    extra={
                      <>
                        <Tag color="success">{detail.status}</Tag>
                        <ModalViewImageContractCoOwner image={detail.contractImages} />
                      </>
                    }
                  >
                    <Carousel autoplay>
                      {detail.property.propertyImages.map((e: any, i: number) => (
                        <Image key={i} src={e.link} />
                      ))}
                    </Carousel>
                    <Row gutter={4}>
                      <Col span={12}>
                        <Card bordered={false}>Resort: {detail.property.resort.resortName}</Card>
                      </Col>
                      <Col span={12}>
                        <Card bordered={false}>
                          <div>Type: {detail.type}</div>
                          <div>
                            Week Number:
                            {detail.timeFrames.map((w: any, i: number) => `${w.weekNumber}, `)}
                          </div>
                          <div>Apartment Id: {detail.roomId}</div>
                        </Card>
                      </Col>
                    </Row>
                    <Card title={'Review'} extra={<a href="#">View More</a>}>
                      {arr.slice(0, 2).map((e: any, i: number) => {
                        return (
                          <Card
                            key={i}
                            style={{ marginTop: 8 }}
                            title={<Rate disabled defaultValue={4.5} />}
                          >
                            <Meta
                              avatar={
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                              }
                              title="User name"
                              description="content reviee"
                            />
                          </Card>
                        );
                      })}
                    </Card>
                  </Card>
                </div>
                <div className="col-span-2">
                  <Card>
                    <Card title="Statistic" extra={<b>This year</b>}>
                      <div className="flex justify-between">
                        <Statistic
                          title="Booking"
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                        <Statistic
                          title="Profit"
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                        <Statistic
                          title="Booking"
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                      </div>
                    </Card>
                    <Card
                      style={{ marginTop: 16 }}
                      title="New booking"
                      extra={<a href="#">View More</a>}
                    >
                      <Row gutter={16}>
                        {arr.map((e: any, i: number) => {
                          return (
                            <Col span={6} key={i}>
                              <Card>
                                <Meta
                                  avatar={
                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                  }
                                  title="User name"
                                  description="Price"
                                />
                                <div>time Book</div>
                                <div>time Book</div>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </Card>
                    <Card
                      style={{ marginTop: 16 }}
                      title="My public"
                      extra={
                        // <Button
                        //   onClick={() => {
                        //     console.log('Open Modals');
                        //   }}
                        //   type="link"
                        //   icon={<ExportOutlined />}
                        // />
                        <ModalCoOwnerCalendar />
                      }
                    >
                      <Table dataSource={availableTime} columns={columns} />
                    </Card>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Image.PreviewGroup>
    </div>
  );
};

export default ManageApartment;

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (id: string) => <a>{id}</a>,
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    key: 'startTime',
    render: (startTime: string) => {
      var date = new Date(startTime);
      return <a>{date.toLocaleDateString('en-GB')}</a>;
    },
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
    key: 'endTime',
    render: (endTime: string) => {
      var date = new Date(endTime);
      return <a>{date.toLocaleDateString('en-GB')}</a>;
    },
  },
  {
    title: 'pricePerNight',
    dataIndex: 'pricePerNight',
    key: 'pricePerNight',
  },
];
