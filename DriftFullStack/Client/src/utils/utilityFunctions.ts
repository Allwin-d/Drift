export const upperCase = (value: string) => {
  return value.toUpperCase();
};

export const lowerCase = (value: string) => {
  return value.toLowerCase();
};

export const convertToDay = (value: string) => {
  const date = value.substring(0, 10);
  console.log("Date: ", date);
  return date;
};
// value : 2026-10-21T15:39:46.557Z
