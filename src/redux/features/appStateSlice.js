import { createSlice } from '@reduxjs/toolkit';

export const appStateSlide = createSlice({
  name: 'AppState',
  initialState: {
    appState: '',
  },
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
  },
});

export const { setAppState } = appStateSlide.actions;
export default appStateSlide.reducer;
