export type DocumentType = {
  _id: string;
  title: string;
  changedBy: string;
  changedAt: Date;
  owner: string;
  visibleFor: [string];
  favouriteInUsers: [string];
  readOnlyMembers: [string];
  content: string;
  openHistory: Array<{ userId: string; date: Date }>;
};

export enum OwnedEnum {
  BY_ANYONE = 'BY_ANYONE',
  BY_ME = 'BY_ME',
  NOT_BY_ME = 'NOT_BY_ME',
}

export enum SortEnum {
  LAST_OPENED_BY_ME = 'LAST_OPENED_BY_ME',
  LAST_MODIFIED_BY_ME = 'LAST_MODIFIED_BY_ME',
  LAST_MODIFIED = 'LAST_MODIFIED',
  TITLE = 'TITLE',
}

export enum UserAccessValuesEnum {
  VIEWER = 'Viewer',
  EDITOR = 'Editor',
  OWNER = 'Owner',
  REMOVE_ACCESS = 'Remove access'
}

export enum UserAccessEnum {
  READ_ONLY = "READ_ONLY",
  FULL = "FULL",
}
