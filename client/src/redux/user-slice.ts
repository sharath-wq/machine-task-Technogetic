import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },

        clearUser: () => initialState,
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
