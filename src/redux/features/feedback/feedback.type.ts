export type TCreateFeedbackReq = {
  message: string;
};

export type TFeedback = {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
};
