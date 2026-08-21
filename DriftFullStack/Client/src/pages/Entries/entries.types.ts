export type entryDetailsType = {
  location: {
    coordinates: number[];
    type: string;
  };
  weather: {
    tempC: number;
    condition: string;
    icon: string;
  };
  _id: string;
  userId: string;
  content: string;
  mood: number;
  placeName: string;
  createdAt: string;
  __v: number;
  timeOfDay : string
};

export type userEntriesType = {
  success: boolean;
  message: string;
  data: entryDetailsType[];
};
