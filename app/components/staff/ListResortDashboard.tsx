'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import DropdownStatusResort from './DropdownStatusResort';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import GetListResort from '@/app/actions/getListResort';
import toast from 'react-hot-toast';
import { Dropdown } from 'flowbite-react';
import { BsCheck2Circle } from 'react-icons/bs';
import { BiBlock } from 'react-icons/bi';
import { MdOutlinePending } from 'react-icons/md';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const statusList = [
  {
    status: 'ACTIVE',
    icon: BsCheck2Circle,
    color: '#2fde26',
  },
  {
    status: 'DEACTIVATE',
    icon: BiBlock,
    color: '#e62538',
  },
  {
    status: 'NO_LONGER_IN_BUSINESS',
    icon: MdOutlinePending,
    color: '#e06d14',
  },
];

function createData(
  resortname: string,
  address: string,
  meter: string,
  bedroom: string,
  rules: string
) {
  return { resortname, address, meter, bedroom, rules };
}

const rows = [
  createData(
    'JW Marriott Phu Quoc Emerald Bay Resort & Spa',
    'Phu Quoc',
    'Sea Resort',
    '1200$ - 2500$',
    '...'
  ),
  createData('Amanoi Resort', 'Ninh Thuan', 'Moutaint Resort', '890$ - 2000$', '...'),
];
interface ListResortAllProps {
  resorts?: any;
}
const ListResortDashboard: React.FC<ListResortAllProps> = ({ resorts: initialResorts }) => {
  const [resorts, setResorts] = React.useState<any>(initialResorts);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(resorts?.totalPages);
  const [isChangeStatus, setIsChangeStatus] = React.useState(false);
  const pageSize = 10;
  // const totalPages = Math.ceil(resorts?.totalElements / pageSize);
  const axiosAuthClient = useAxiosAuthClient();

  const onPageChange = async (newPage: any) => {
    try {
      let pageNoParam = newPage - 1;
      const newResortsData = await GetListResort(pageNoParam.toString());

      setResorts({ content: newResortsData.content, totalElements: newResortsData.totalElements });

      setCurrentPage(newPage);
    } catch (error) {
      console.error('Error fetching list of resorts:', error);
    }
  };

  const handleOnChangeStatus = (id: any, value: any) => {
    const body = value;
    const config = {
      headers: { 'Content-type': 'application/json' },
    };

    axiosAuthClient
      .put(`/resorts/${id}/status`, body, config)
      .then(async () => {
        toast.success('Update status success');
        const newList = await GetListResort((currentPage - 1).toString());
        setResorts({
          content: newList.content,
          totalElements: newList.totalElements,
        });
        setIsChangeStatus(true);
      })
      .catch((response) => {
        toast.error(response);
      })
      .finally(async () => {
        const newList = await GetListResort((currentPage - 1).toString());
        setResorts({
          content: newList.content,
          totalElements: newList.totalElements,
        });
      });
  };
  return (
    <div className="hidden md:block md:w-auto md:h-auto md:py-10">
      <div className="flex flex-row justify-between items-center mt-10 mb-4">
        <div className="text-common text-[20px] font-bold ">List Resort</div>
        <Link className="text-gray-400" href="/staff/listresort">
          View All List Resort
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="!bg-white !text-black !text-[17px] !font-semibold">
                Resort Name{' '}
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="left"
              >
                Adress
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="left"
              >
                Property Type
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="left"
              >
                Status
              </StyledTableCell>
              {/* <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="left"
              >
                Amenity Type{' '}
              </StyledTableCell> */}

              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Action{' '}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resorts?.content.slice(0, 3).map((row: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell className="!py-5 !text-common" component="th" scope="row">
                  <Link href={`/staff/staffdetailresort/${row.id}`} className="hover:underline">
                    {row.resortName}
                  </Link>
                </StyledTableCell>
                <StyledTableCell>{row.addressLine}</StyledTableCell>
                <StyledTableCell className="!py-5 " align="left">
                  {row.propertyTypes.map((item: any, index: number) => (
                    <div key={index}>{item.propertyTypeName}</div>
                  ))}
                </StyledTableCell>
                <StyledTableCell className="!py-5 " align="left">
                  {(() => {
                    let statusText = '';
                    if (row.status === 'ACTIVE') {
                      statusText = 'ACTIVE';
                    } else if (row.status === 'DEACTIVATE') {
                      statusText = 'DEACTIVATE';
                    } else if (row.status === 'NO_LONGER_IN_BUSINESS') {
                      statusText = 'LONGER BUSINESS';
                    }

                    return (
                      <div
                        className={`py-2 px-1 text-sm text-center  bg-slate-200 font-bold rounded-md ${
                          statusText === 'ACTIVE' ? 'text-green-500' : ''
                        } ${statusText === 'DEACTIVATE' ? 'text-rose-500' : ''} ${
                          statusText === 'NO_LONGER_IN_BUSINESS' ? 'text-orange-500' : ''
                        }`}
                      >
                        {statusText}
                      </div>
                    );
                  })()}
                </StyledTableCell>

                <StyledTableCell className="!py-5 !text-green-500 " align="right">
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span className="text-sky-500 hover:underline cursor-pointer">Edit</span>
                    )}
                  >
                    {(() => {
                      if (row.status === 'ACTIVE') {
                        return (
                          <>
                            {statusList.slice(1, 3).map((status: any, index: number) => (
                              <Dropdown.Item
                                key={index}
                                value={status.status}
                                className="flex items-center gap-2"
                                onClick={() => handleOnChangeStatus(row.id, status.status)}
                              >
                                <status.icon size={18} color={status.color} />

                                <span className={`text-[${status.color}]`}>{status.status}</span>
                              </Dropdown.Item>
                            ))}
                          </>
                        );
                      } else if (row.status === 'DEACTIVATE') {
                        const newArrray = statusList.filter(
                          (item) =>
                            item.status === 'ACTIVE' || item.status === 'NO_LONGER_IN_BUSINESS'
                        );
                        return (
                          <>
                            {newArrray.map((status: any, index: number) => (
                              <Dropdown.Item
                                key={index}
                                value={status.status}
                                className="flex items-center gap-2"
                                onClick={() => handleOnChangeStatus(row.id, status.status)}
                              >
                                <status.icon size={18} color={status.color} />

                                <span className={`text-[${status.color}]`}>{status.status}</span>
                              </Dropdown.Item>
                            ))}
                          </>
                        );
                      } else if (row.status === 'NO_LONGER_IN_BUSINESS') {
                        return (
                          <>
                            {statusList.slice(0, 2).map((status: any, index: number) => (
                              <Dropdown.Item
                                key={index}
                                value={status.status}
                                className="flex items-center gap-2"
                                onClick={() => handleOnChangeStatus(row.id, status.status)}
                              >
                                <status.icon size={18} color={status.color} />

                                <span className={`text-[${status.color}]`}>{status.status}</span>
                              </Dropdown.Item>
                            ))}
                          </>
                        );
                      }
                    })()}
                  </Dropdown>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ListResortDashboard;
