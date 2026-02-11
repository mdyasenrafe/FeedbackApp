import { baseApi } from '../../api/baseApi';
import { setAuth } from './auth.slice';
import { saveAuthToStorage } from './auth.storage';
import {
  TRequestLoginLinkReq,
  TRequestLoginLinkRes,
  TVerifyLoginLinkReq,
  TVerifyLoginLinkRes,
} from './auth.type';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestLoginLink: builder.mutation<
      TRequestLoginLinkRes,
      TRequestLoginLinkReq
    >({
      query: body => ({
        url: '/auth/login-link',
        method: 'POST',
        body,
      }),
    }),

    verifyLoginLink: builder.mutation<TVerifyLoginLinkRes, TVerifyLoginLinkReq>(
      {
        query: body => ({
          url: '/auth/login-link/verify',
          method: 'POST',
          body,
        }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;

            dispatch(
              setAuth({ accessToken: data.accessToken, user: data.user }),
            );

            await saveAuthToStorage({
              accessToken: data.accessToken,
              user: data.user,
            });
          } catch {}
        },
      },
    ),
  }),
});

export const { useRequestLoginLinkMutation, useVerifyLoginLinkMutation } =
  authApi;
