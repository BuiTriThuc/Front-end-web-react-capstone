import { configureStore } from "@reduxjs/toolkit";
import apartmentForRentReducer from "./slices/searchApartmentForRentSlice";
import notificationReducer from './slices/pushNotificationSlice';
import conversationReducer from './slices/conversationSlice';


export const store = configureStore({
  reducer: {
    apartmentForRent: apartmentForRentReducer,
    pushNotification: notificationReducer,
    conversation: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
