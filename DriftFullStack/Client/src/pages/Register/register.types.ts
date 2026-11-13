export type registerUserDetailType = {
  name: string;
  email: string;
  password: string;
};

export type registerResponseType = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
  };
};
