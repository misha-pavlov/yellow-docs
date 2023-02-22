export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  token: string;
};

export type User = {
  _id: string;
};

export type UserLoading = {
  userPromise: Promise<User>;
};
