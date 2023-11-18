import {PayloadAction, createAsyncThunk, createSlice, createStore} from "@reduxjs/toolkit";
import ApartmentForRentApis from '@/app/components/map/apis/ApartmentForRentApis';
import { ApartmentForRentResponse, SearchApartmentForRentParams } from '@/app/components/map/type';

export const fetchApartmentForRent = createAsyncThunk("apartment/fetchApartmentForRent", async (_, thunkApi) => {
  try {
    return await ApartmentForRentApis.getAll();
  } catch (error) {
    thunkApi.dispatch(removeSearchData());
    return Promise.reject(error);
  }
});

export interface apartmentForRentState {
  loading: boolean;
  searchParams: SearchApartmentForRentParams;
  data: ApartmentForRentResponse;
  guest: {
    adult: number;
    children: number;
    infant: number;
  }
}

const initialState = {
  loading: false,
  searchParams: {
    locationName: '',
    resortId: null,
    checkIn: null,
    checkOut: null,
    min: null,
    max: null,
    guest: null,
    listOfInRoomAmenity: [],
    listOfPropertyView: [],
    listOfPropertyType: [],
    sortBy: 'id',
    sortDirection: 'asc',
  },
  guest: {
    adult: 1,
    children: 0,
    infant: 0,
  },
  data: {},
} as unknown as apartmentForRentState

export const searchApartmentForRentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    setApartmentForRentLoading: (state, action) => {
      state.loading = action.payload;
    },
    setApartmentForRentParams: (state, action) => {
      state.searchParams = action.payload;
    },
    setGuestParams: (state, action) => {
      state.guest = action.payload;
    },
    fetchApartments: (state, action) => {
      state.data = action.payload;
    },
    removeSearchParams: (state) => {
      state.searchParams = {
        ...initialState.searchParams,
      };
    },
    removeSearchData: (state) => {
      state.data = {
        ...initialState.data,
      };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchApartmentForRent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApartmentForRent.rejected, (state) => {
        state.loading = true;
        state.data = {
          ...initialState.data,
        };
      });
  },
});

// Action creators are generated for each case reducer function
export const { setApartmentForRentLoading, setApartmentForRentParams,removeSearchParams , removeSearchData, fetchApartments , setGuestParams} = searchApartmentForRentSlice.actions;
export default searchApartmentForRentSlice.reducer;