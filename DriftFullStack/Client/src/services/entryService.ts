import api from "../api/axios";
import type { userEntriesType } from "../pages/Entries/entries.types";
import { ENTRY_API } from "../url/url";

export const fetchEntries = async () => {
  const result = await api.get<userEntriesType>(ENTRY_API);
  return result.data.data;
};
