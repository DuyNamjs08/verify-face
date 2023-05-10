import { createSlice } from "@reduxjs/toolkit";

const VerifyVoice = createSlice({
  name: "face",
  initialState: {
    name: "123131",
  },
  reducers: {},
  extraReducers: {},
});

const { actions, reducer } = VerifyVoice;
export default reducer;