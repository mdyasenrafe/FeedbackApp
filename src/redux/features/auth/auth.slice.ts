import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from './auth.type';

type AuthState = {
  accessToken: string | null;
  user: TUser | null;
  hydrated: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ accessToken: string; user: TUser }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    clearAuth: state => {
      state.accessToken = null;
      state.user = null;
    },

    // ✅ called during app boot
    setAuthFromStorage: (
      state,
      action: PayloadAction<{ accessToken: string; user: TUser } | null>,
    ) => {
      if (action.payload) {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      }
      state.hydrated = true;
    },

    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.hydrated = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setAuthFromStorage, setHydrated } =
  authSlice.actions;
export default authSlice.reducer;
