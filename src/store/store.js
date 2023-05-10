import { combineReducers, configureStore } from '@reduxjs/toolkit';
import verifyFace from '../features/VerifyFace'
import verifyVoice from '../features/VerifyVoice'
// =========================

const rootReducer = combineReducers({
    verifyFace:verifyFace,
    verifyVoice:verifyVoice
})

const configStore = () => {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  
    return store;
  };
  
  const store = configStore();
  export default store;