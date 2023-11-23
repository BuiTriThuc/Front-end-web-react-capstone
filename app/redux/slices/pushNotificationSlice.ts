import {PayloadAction, createAsyncThunk, createSlice, createStore} from "@reduxjs/toolkit";
import ApartmentForRentApis from '@/app/components/map/apis/ApartmentForRentApis';
import { ApartmentForRentResponse, SearchApartmentForRentParams } from '@/app/components/map/type';
import NotificationApis from '@/app/actions/NotificationApis';
import { NotificationResponse } from "@/app/components/notification/types";

export const fetchNotification = createAsyncThunk("notification/fetchNotification", async (_, thunkApi) => {
  try {
    // return await NotificationApis.getAll();
  } catch (error) {
    thunkApi.dispatch(removeNotifications());
    return Promise.reject(error);
  }
});

const initialState = {
  loading: false,
  data: [] as NotificationResponse[],
}

export const pushNotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationLoading: (state, action) => {
      state.loading = action.payload;
    },
    fetchNotifications: (state, action) => {
      state.data = action.payload;
      console.log('action.payload', action.payload);
      console.log('state.data', state.data);
    },
    addNotification: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    removeNotifications: (state) => {
      state.data = initialState.data;
    },
    readAllNotifications: (state) => {
      state.data = state.data.map((item) => ({ ...item, isRead: true }));
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
      })
      .addCase(fetchNotification.rejected, (state) => {
        state.loading = true;
        state.data = {
          ...initialState.data,
        };
      });
  },
});

// Action creators are generated for each case reducer function
export const { addNotification, setNotificationLoading, fetchNotifications,removeNotifications , readAllNotifications} = pushNotificationSlice.actions;
export default pushNotificationSlice.reducer;