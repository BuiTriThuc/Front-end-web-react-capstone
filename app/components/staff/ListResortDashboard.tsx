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

export default function ListResortDashboard() {
  return (
    <div className="hidden md:block md:w-auto md:h-auto md:py-10">
      <div className="flex flex-row justify-between items-center mt-10">
        <div className="text-common text-[20px] font-bold ">List Resort</div>
        <Link className="text-gray-400" href="#">
          View All List Resort
        </Link>
      </div>
      <TableContainer className="mt-4" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="!bg-white !text-black !text-[17px] !font-semibold">
                Resort Name{' '}
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Adress
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Type
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                Price{' '}
              </StyledTableCell>
              <StyledTableCell
                className="!bg-white !text-black !text-[17px] !font-semibold"
                align="right"
              >
                rules{' '}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.resortname}>
                <StyledTableCell className="!py-5 !text-common" component="th" scope="row">
                  <Link href="#">{row.resortname}</Link>
                </StyledTableCell>
                <StyledTableCell className="!py-5 !text-common" align="right">
                  {row.address}
                </StyledTableCell>
                <StyledTableCell className="!py-5 " align="right">
                  {row.meter}
                </StyledTableCell>
                <StyledTableCell className="!py-5 !text-green-500 " align="right">
                  {row.bedroom}
                </StyledTableCell>
                <StyledTableCell className="!py-5 !text-green-500 " align="right">
                  {row.rules}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
