import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://feedback-backend-shh8.onrender.com',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'baseapi',
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: [],
});
