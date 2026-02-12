import { baseApi } from '../../../api/baseApi';
import { TCreateFeedbackReq, TFeedback } from './feedback.type';

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createFeedback: builder.mutation<TFeedback, TCreateFeedbackReq>({
      query: body => ({
        url: '/feedback',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateFeedbackMutation } = feedbackApi;
