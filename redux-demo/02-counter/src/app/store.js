import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

// 使用 cunterReducer
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
