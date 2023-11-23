"use client";
import styled from "styled-components";
// import calender from "../../Logos/calendar.png";
// import placeholder from "../../Logos/placeholder.png";

// import addgroup from "../../Logos/addgroup.png";

import GuestCard from "./AnyReactComponent/GuestCard";
import { useState } from "react";
import { useEffect } from "react";
import { Search } from "./AnyReactComponent/Search";
import { useDispatch, useSelector } from 'react-redux';
import { setApartmentForRentParams } from '@/app/redux/slices/searchApartmentForRentSlice';
import dayjs from 'dayjs';
import { useToggle } from '@/app/components/navbar/UserMenu';

export default function SearchBar() {
  const dispatch = useDispatch();
  const params = useSelector((state: any) => state.apartmentForRent.searchParams);
  const [show, setShow] = useState(false);
  const [hotelClass, setHotelClass] = useState(false);
  const [houseClass, setHouseClass] = useState(false);
  const [border, setBorder] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [clickedCheckOut, setClickedCheckOut] = useState(false);
  const [guestSelect, setGuestSelect] = useState(false);
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate]
    = useState(dayjs(params?.checkIn, 'YYYY-MM-DD').isValid()?
    dayjs(params?.checkIn, 'YYYY-MM-DD').toDate().toString().slice(0, 15)
    :"-- /-- /----");
  const [checkOutDate, setCheckOutDate]
    = useState(dayjs(params?.checkOut, 'YYYY-MM-DD').isValid()?
    dayjs(params?.checkOut, 'YYYY-MM-DD').toDate().toString().slice(0, 15)
    :"-- /-- /----");
  const [guestNumber, setGuestNumber] = useState(params?.guest??1);
  const [roomsNumber, setRoomsNumber] = useState(1);

  const [daysNum, setDaysNum] = useState(null)
  useEffect(() => {
    setShow(true);
  }, []);

  const toggleDatePicker = useToggle(setDatePicker, [setClickedCheckOut, setGuestSelect]);
  const toggleGuestSelector = useToggle(setGuestSelect, [setDatePicker, setClickedCheckOut]);
  const handleDatePicker = () => {
    toggleDatePicker();
    updateDateSearchParams();
  };
  const handleGuestSelector = () => {
    toggleGuestSelector();
    updateGuestSearchParams();
  }

  const updateDateSearchParams = () => {
    console.log(checkInDate);
    dispatch(setApartmentForRentParams({
      ...params,
      checkIn: dayjs(checkInDate).format('YYYY-MM-DD'),
      checkOut: dayjs(checkOutDate).format('YYYY-MM-DD'),
    }));
    console.log(params);
  }

  const updateGuestSearchParams = () => {
    console.log(guestNumber);
    dispatch(setApartmentForRentParams({
      ...params,
      guest: guestNumber
    }));
    console.log(params);
  }

  return (
      <div className="search-bar-cont">
        <SearchBoxWrapper>
          <SearchBarMainWrapper>
            <PickDateWrapper>
              <div>
                <div onClick={handleDatePicker} className="checkIndate">
                  {/* <img src={calender} alt="" /> */}
                  <div className="date-al date-al-margin">
                    <span>Check in</span>
                    <span>{checkInDate}</span>
                  </div>
                  {checkInDate !== "-- /-- /----" &&
                    <div className="arrows-margin">
                      {/* <ArrowBackIosIcon style={{ cursor: "pointer" }} />
                      <ArrowForwardIosIcon style={{ cursor: "pointer" }} /> */}
                    </div>
                  }
                </div>
                <span className="partitionLine"></span>
                <div onClick={handleDatePicker} className="checkOutdate">
                  <div className="date-al date-al-margin">
                    <span>Check out</span>
                    <span>{checkOutDate}</span>
                  </div>
                  {checkInDate !== "-- /-- /----" && <div className="arrows-margin2">
                    {/* <ArrowBackIosIcon style={{ cursor: "pointer" }} />
                    <ArrowForwardIosIcon style={{ cursor: "pointer" }} /> */}
                  </div>}
                </div>
              </div>
            </PickDateWrapper>
            <SelectGuestsWrapper>
              <div>
                <div onClick={handleGuestSelector} className="guestsnumber">
                  {/* <img src={addgroup} alt="" /> */}
                  <div className="guest-al">
                    <span>Who</span>
                    {/*{roomsNumber && <span>{roomsNumber} Room</span>}*/}
                    {guestNumber && <span>{guestNumber} Guests</span>}
                  </div>
                </div>
              </div>
            </SelectGuestsWrapper>
          </SearchBarMainWrapper>
        </SearchBoxWrapper>
        {datePicker && (
          <Search
            left="25%"
            top="36rem"
            position="absolute"
            setCheckInDate={setCheckInDate}
            setCheckOutDate={setCheckOutDate}
          />
        )}
        {clickedCheckOut && (
          <Search
            left="25%"
            top="36rem"
            position="absolute"
            setCheckInDate={setCheckInDate}
            setCheckOutDate={setCheckOutDate}
          />
        )}
        {guestSelect && <GuestCard top="36rem" position="absolute" right="30rem" setGuestNumber={setGuestNumber} setRoomsNumber={setRoomsNumber} />}
      </div>
  );
}
export const SearchBoxWrapper = styled.div`
  border-radius: 0 12px 12px 12px;
  width: 100%;
  box-shadow: 1px 1px 4px rgb(205 208 210);
  background-color: white;
`;
export const SearchBarMainWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
export const PickDateWrapper = styled.div`
  width: 70%;
  padding: 0 1rem;
  border-right: 1px solid rgb(205, 208, 210);

  & > div {
    width: 100%;
    display: flex;
    height: 100%;
    .checkIndate {
      width: 50%;
      display: flex;

      position: relative;

      align-items: center;
      padding-left: 1px;

      height: 4rem;

      :active {
        border: 1px dotted;
      }

      img {
        width: 18px;
      }
    }
    .date-al-margin {
      position: relative;
      left: 1rem;
      grid-gap: 0.2rem;
    }
    .partitionLine {
      width: 1px;
      height: 80%;
      background-color: rgb(205, 208, 210);
      margin-top: 6px;
    }
    .arrows-margin {
      position: relative;
      left: 2rem;
    }
    .arrows-margin2 {
      position: relative;
      left: 5rem;
    }
    .date-al {
      display: grid;

      & > span:nth-child(1) {
        font-size: 12px;
        font-weight: 100;
      }
      & > span:nth-child(2) {
        font-size: 12px;
        font-weight: 600;
      }
    }
    .checkOutdate {
      width: 50%;
      display: flex;
      align-items: center;
      position: relative;

      height: 4rem;
      :active {
        border: 1px dotted;
      }
    }
  }
`;
export const SelectGuestsWrapper = styled.div`
  width: 32%;
  /* padding: 1rem; */
  padding-left: 1rem;
  & > div {
    display: flex;
    align-items: center;
    height: 100%;
    img {
      width: 18px;
      height: 18px;
      position: relative;
      top: 4px;
    }
    .guestsnumber {
      display: flex;
      width: 50%;
      :active {
        border: 1px dotted;
      }
      .guest-al {
        display: grid;
        position: relative;
        left: 1rem;

        & > span:nth-child(1) {
          font-size: 11px;
        }
        & > span:nth-child(2) {
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
    button {
    width: 60%;
    height:80%;
    padding: 1rem;
    background-color: #007fad;
    border: 1px solid #007fad;
    border-bottom-color: #005f81;
    border-radius: 4rem;
    color: white;
    outline: none;
    font-size: 16px;
    font-weight: 700;
      :hover {
        background-color: #005f81;
        cursor: pointer;
      }
    }
  }
`;