import { createSlice } from '@reduxjs/toolkit';

export const globalLoadingSlide = createSlice({
  name: 'globalLoading',
  initialState: {
    globalLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlide.actions;
export default globalLoadingSlide.reducer;
