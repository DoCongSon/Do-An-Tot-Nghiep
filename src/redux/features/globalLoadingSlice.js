import { createSlice } from '@reduxjs/toolkit';

export const globalLoadingSlide = createSlice({
  name: 'GlobalLoading',
  initialState: {
    globalLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.appState = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlide.actions;
export default globalLoadingSlide.reducer;
