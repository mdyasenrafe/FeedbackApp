export type TUser = {
  id: string;
  email: string;
};

export type TRequestLoginLinkReq = {
  email: string;
};

export type TRequestLoginLinkRes = {
  ok: true;
};

export type TVerifyLoginLinkReq = {
  token: string;
};

export type TVerifyLoginLinkRes = {
  accessToken: string;
  user: TUser;
};
