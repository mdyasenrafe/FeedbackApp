import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux';

const baseQuery = fetchBaseQuery({
  baseUrl: 'HERE_GO_SERVER_URL',
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).auth.token;
    // if (token) {
    //   headers.set('authorization', `Bearer ${token}`);
    // }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'baseapi',
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: [],
});
