import { configureStore } from '@reduxjs/toolkit';
import appStateSlice from './features/appStateSlice';
import globalLoadingSlice from './features/globalLoadingSlice';

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    globalLoading: globalLoadingSlice,
  },
});

export default store;
