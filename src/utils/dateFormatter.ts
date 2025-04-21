import { DateTime } from 'luxon';

export const formatDisplayDate = (dateTime: string): string => {
  const formattedDisplayDate = DateTime.fromISO(dateTime).toFormat('dd MMMM yyyy');
  return formattedDisplayDate;
};
