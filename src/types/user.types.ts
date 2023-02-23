export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  token: string;
};

export type TokenLoading = {
  tokenPromise: Promise<string>;
};
