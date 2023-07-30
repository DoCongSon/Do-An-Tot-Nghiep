import { configureStore } from '@reduxjs/toolkit';
import appStateSlice from './features/appStateSlice';
import globalLoadingSlice from './features/globalLoadingSlice';
import userSlice from './features/userSlice';

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    globalLoading: globalLoadingSlice,
    user: userSlice,
  },
});

export default store;
