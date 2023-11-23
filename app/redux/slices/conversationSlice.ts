import { PayloadAction, createAsyncThunk, createSlice, createStore } from '@reduxjs/toolkit';
import ConversationApis, { Conversation } from '@/app/actions/ConversationApis';

export const fetchConversation = createAsyncThunk('conversation/fetchConversation', async (_, thunkApi) => {
  try {
    return await ConversationApis.getCurrentUserConversation();
  } catch (error) {
    thunkApi.dispatch(removeConversations());
    return Promise.reject(error);
  }
});

const initialState = {
  loading: false,
  loaded: false,
  data: [] as Conversation[],
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversationLoading: (state, action) => {
      state.loading = action.payload;
    },
    setConversationLoaded: (state, action) => {
      state.loading = action.payload;
    },
    fetchConversations: (state, action) => {
      state.data = action.payload;
    },
    removeConversations: (state) => {
      state.data = initialState.data;
    },
    readAllConversations: (state) => {
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchConversation.rejected, (state) => {
        state.loading = true;
        state.data = {
          ...initialState.data,
        };
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setConversationLoading,
  fetchConversations,
  removeConversations,
  setConversationLoaded,
  readAllConversations,
} = conversationSlice.actions;
export default conversationSlice.reducer;