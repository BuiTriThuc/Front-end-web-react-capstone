import { configureStore } from "@reduxjs/toolkit";
import apartmentForRentReducer from "./slices/searchApartmentForRentSlice";
import notificationReducer from './slices/pushNotificationSlice';


export const store = configureStore({
  reducer: {
    apartmentForRent: apartmentForRentReducer,
    pushNotification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
