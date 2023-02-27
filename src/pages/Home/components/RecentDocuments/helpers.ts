import { DocumentType, SortEnum } from '../../../../types/document.types';

export const getDate = (
  sort: SortEnum,
  openHistory: DocumentType['openHistory'],
  changedAt: Date,
  currentUserId?: string
) => {
  if (sort === SortEnum.LAST_OPENED_BY_ME) {
    return openHistory.find(history => history.userId === currentUserId)?.date;
  }

  return changedAt;
};
