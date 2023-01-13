export type User = {
  _id: string;
};

export type UserLoading = {
  userPromise: Promise<User>;
};
