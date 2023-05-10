import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { faceApi } from '../api/faceApi'

export const compareFace = createAsyncThunk('compare-face', async (payload, { rejectWithValue }) => {
  try {
    console.log('payload' ,payload )
    const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      return blob;
    }
    const blobImage1 = dataURItoBlob(payload.image_target);
    const blobImage2 = dataURItoBlob(payload.images_source);
    const formData = new FormData();
    formData.append('image_target', blobImage1);
    formData.append('images_source', blobImage2);
    const response = await faceApi.compareFace(formData)

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
const VerifyFace = createSlice({
  name: "face",
  initialState: {
    img1: '12',
    img2: '21',
    resultPercent:''
  },
  reducers: {
    addImgOne: (state, actions) => {
      state.img1 = actions.payload
    },
    addImgTwo: (state, actions) => {
      state.img2 = actions.payload
    },
    addPercent: (state, actions) => {
      state.resultPercent = actions.payload
    }
  },
  extraReducers: {},
});

const { actions, reducer } = VerifyFace;
export const { addImgOne, addImgTwo , addPercent } = actions
export default reducer;
