export type loginUserDetailType = {
  email: string;
  password: string;
};

export type loginResponseType = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  accessToken: string;
};
