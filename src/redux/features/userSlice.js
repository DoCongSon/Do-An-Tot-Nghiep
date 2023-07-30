import { createSlice } from '@reduxjs/toolkit';

const initialUser = {
  name: null,
  age: null,
  sex: null,
  address: null,
  phoneNumber: null,
  dateOfBirth: null,
  QRCodeUrl: null,
  userId: null,
  dataPatient: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialUser,
    admin: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.sex = action.payload.sex;
      state.address = action.payload.address;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.QRCodeUrl = action.payload.QRCodeUrl;
      state.userId = action.payload.userId;
      state.phoneNumber = action.payload.phoneNumber;
      state.dataPatient = action.payload.dataPatient;
    },
    clearUser: (state) => {
      state.name = null;
      state.age = null;
      state.sex = null;
      state.address = null;
      state.phoneNumber = null;
      state.dateOfBirth = null;
      state.QRCodeUrl = null;
      state.userId = null;
      state.dataPatient = [];
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { setUser, clearUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;
