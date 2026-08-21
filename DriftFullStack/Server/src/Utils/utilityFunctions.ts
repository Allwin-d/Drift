import { sessionOfDayEnum } from "../Models/EntrySchema/entrySchema.types.js";

export const sessionRange = (hour: number): sessionOfDayEnum => {
  if (hour >= 0 && hour <= 5) {
    return sessionOfDayEnum.LATE_NIGHT;
  } else if (hour >= 5 && hour <= 8) {
    return sessionOfDayEnum.EARLY_MORNING;
  } else if (hour >= 8 && hour <= 12) {
    return sessionOfDayEnum.MORNING;
  } else if (hour >= 12 && hour <= 17) {
    return sessionOfDayEnum.AFTERNOON;
  } else if (hour >= 17 && hour <= 21) {
    return sessionOfDayEnum.EVENING;
  } else {
    return sessionOfDayEnum.NIGHT;
  }
};
