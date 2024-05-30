import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import tasksReducer from './task-slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
