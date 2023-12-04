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
import SelectRouterStaff from './SelectRouterStaff';
import DropdownStatusResort from './DropdownStatusResort';
import GetListResort from '@/app/actions/getListResort';
import { Dropdown, Pagination } from 'flowbite-react';
import HeadingDashboard from '../HeadingDashboard';
import { BsCheck2Circle } from 'react-icons/bs';
import { BiBlock } from 'react-icons/bi';
import { MdOutlinePending } from 'react-icons/md';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';
import axios from 'axios';

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

interface ListResortAllProps {
  resorts?: any;
}
const ListResortAll: React.FC<ListResortAllProps> = ({ resorts: initialResorts }) => {
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
    <>
      <div className="mt-2">
        <HeadingDashboard
          routerDashboard="/staff"
          pageCurrentContent="List resort"
          pageCurrentRouter="/staff/listresort"
        />
      </div>
      <SelectRouterStaff />
      <div className="text-common text-[20px] font-bold py-5 ">List Resort</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="!bg-white !text-black !text-[17px] !font-semibold w-[200px]">
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

              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Action{' '}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resorts?.content.map((row: any, index: number) => (
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
                            {statusList.slice(0, 1).map((status: any, index: number) => (
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
                        return (
                          <>
                            {statusList.slice(1, 2).map((status: any, index: number) => (
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
      <div className="flex py-5 overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </>
  );
};

export default ListResortAll;
