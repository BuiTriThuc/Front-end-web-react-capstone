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
import { format } from 'date-fns';
import DropDownBanMember from './DropDownBanMember';
import Image from 'next/image';

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

function createData(
  imageUrl: string,
  name: string,
  address: string,
  email: string,
  phone: string,
  apartment: string
) {
  return { imageUrl, name, address, email, phone, apartment };
}

const rows = [
  createData(
    '/images/resort1.jpg',
    'Trí Thức',
    'Dak Lak province',
    'buitrithuc1008@gmail.com',
    '0856597778',
    '4'
  ),
  createData(
    '/images/resort1.jpg',
    'Trọng Tín',
    'Long An Province',
    'trongtin@gmail.com',
    '0965487221',
    '3'
  ),
  createData(
    '/images/resort1.jpg',
    'Đức Thịnh',
    'Đak Lak province',
    'thinhbui@gmail.com',
    '0376985769',
    '1'
  ),
];
interface ListMembershipAllProps {
  users?: any;
}

const ListMembershipAll: React.FC<ListMembershipAllProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 7;

  const displayedItems = users?.content?.slice(0, 3);

  return (
    <div className="hidden md:block md:w-auto md:h-auto ">
      <div className="flex flex-row justify-between items-center mb-5 ">
        <div className="text-common text-[20px] font-bold ">List Membership</div>
        <Link className="text-gray-400" href="/staff/listmember">
          View All List Membership
        </Link>
      </div>
      <TableContainer className="mb-10" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="!bg-white !text-black !text-[17px] !font-semibold">
                Name{' '}
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Gender
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Email
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Phone{' '}
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Status{' '}
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Day of birth{' '}
              </StyledTableCell>
              {/* <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Action{' '}
              </StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedItems.map((row: any) => (
              <StyledTableRow key={row.userId}>
                <StyledTableCell className="!py-5 !text-common" component="th" scope="row">
                  <div className="flex flex-row items-center ">
                    <Image
                      className="w-10 h-10 rounded-full mr-2"
                      width={50}
                      height={50}
                      src={row.avatar || '/images/placeholder.jpg'}
                      alt=""
                    />
                    <Link href="/staff/editmembership" className="hover:underline">
                      {row.username}
                    </Link>
                  </div>
                </StyledTableCell>
                <StyledTableCell className="!py-5 !text-common" align="right">
                  {row.gender}
                </StyledTableCell>
                <StyledTableCell className="!py-5 " align="right">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell className="!py-5 " align="right">
                  {row.phone}
                </StyledTableCell>
                <StyledTableCell className="!py-5 !text-green-500 " align="right">
                  {row.status}
                </StyledTableCell>
                <StyledTableCell className="!py-5  " align="right">
                  {format(new Date(row.dob), 'dd-MM-yyyy')}
                </StyledTableCell>
                {/* <StyledTableCell className="!py-5" align="right">
                  <DropDownBanMember />
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ListMembershipAll;
