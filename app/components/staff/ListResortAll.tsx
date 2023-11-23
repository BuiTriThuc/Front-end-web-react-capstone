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
import DropdownDeleteResort from './DropdownDeleteResort';
import SelectRouterStaff from './SelectRouterStaff';

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
  createData('The Anam Cam Ranh', 'Khanh Hoa', 'Moutaint Resort', '990$ - 2300$', '...'),
  createData(
    'Vinpearl Resort & Spa Phu Quoc',
    'Phu Quoc',
    'Moutaint Resort',
    '1890$ - 3000$',
    '...'
  ),
  createData('Six Senses Ninh Van Bay', 'Khanh Hoa', 'Sea Resort', '190$ - 500$', '...'),
  createData('Fusion Maia Da Nang', 'Da Nang', 'Sea Resort', '230$ - 700$', '...'),
  createData('Vinpearl Luxury Da Nang', 'Da Nang', 'Sea Resort', '1000$ - 3000$', '...'),
  createData(
    'InterContinental Danang Sun Peninsula Resort',
    'Da Nang',
    'Sea Resort',
    '900$ - 2000$',
    '...'
  ),
];

interface ListResortAllProps {
  resorts?: any;
}

const ListResortAll: React.FC<ListResortAllProps> = ({ resorts }) => {
  return (
    <>
      <div className="mt-10">
        Dashboard {'>'} <span className="text-common">List resort</span>
      </div>
      <SelectRouterStaff />
      <div className="text-common text-[20px] font-bold py-5 ">List Resort</div>
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
            {resorts?.content.map((row: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell className="!py-5 !text-common" component="th" scope="row">
                  <Link href="/staff/staffdetailresort" className="hover:underline">
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
                  Active
                </StyledTableCell>
                {/* <StyledTableCell className="!py-5 " align="left">
                  {row?.resortAmenityTypes?.map((item: any, index: number) => (
                    <div key={index}>{item.resortAmenityTypeName}</div>
                  ))}
                </StyledTableCell> */}

                <StyledTableCell className="!py-5 !text-green-500 " align="right">
                  <DropdownDeleteResort />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListResortAll;
