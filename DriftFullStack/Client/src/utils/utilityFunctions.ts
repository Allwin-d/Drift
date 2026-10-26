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

export const findDay = (day: number) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid Day Number";
  }
};

export const findMonth = (month: number) => {
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sept";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
  }
};

export const sessionRange = (hour: number) => {
  if (hour >= 0 && hour <= 5) {
    return "Late Night";
  } else if (hour >= 5 && hour <= 8) {
    return "Early Morning";
  } else if (hour >= 8 && hour <= 12) {
    return "Morning";
  } else if (hour >= 12 && hour <= 17) {
    return "Afternoon";
  } else if (hour >= 17 && hour <= 21) {
    return "Evening";
  } else {
    return "Night";
  }
};
