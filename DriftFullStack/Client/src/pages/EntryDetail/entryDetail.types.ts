import type { entryDetailsType } from "../Entries/entries.types";

export type singleEntryResponseType = {
  success: boolean;
  message: string;
  data: entryDetailsType;
};

export type deleteEntryType = {
  success: boolean;
  message: string;
  data: entryDetailsType;
};
