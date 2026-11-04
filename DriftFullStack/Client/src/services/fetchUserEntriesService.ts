import api from "../api/axios";
import type { userEntriesType } from "../pages/Entries/entries.types";
import { ENTRY_API } from "../url/url";

export type fetchUserEntriesProps = {
  page?: number;
  limit?: number;
  mood?: number;
};

export const fetchUserEntries = async ({
  page,
  limit,
  mood,
}: fetchUserEntriesProps) => {
  const result = await api.get<userEntriesType>(ENTRY_API, {
    params: { page, limit, mood },
  });
  return result.data;
};
