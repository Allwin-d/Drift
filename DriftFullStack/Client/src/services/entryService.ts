import api from "../api/axios";
import type { userEntriesType } from "../pages/Entries/entries.types";

export const fetchEntries = async () => {
  const result = await api.get<userEntriesType>("/entries");
  return result.data.data;
};
