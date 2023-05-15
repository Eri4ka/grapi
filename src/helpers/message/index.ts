const twoDigits = (num: number): string | number => {
  return num < 10 ? `0${num}` : num;
};

export const getCurrentTime = (unixTime?: number): string => {
  const currentDate = unixTime ? new Date(unixTime * 1000) : new Date();
  const hours = twoDigits(currentDate.getHours());
  const minutes = twoDigits(currentDate.getMinutes());

  const currentTime = `${hours}:${minutes}`;

  return currentTime;
};
