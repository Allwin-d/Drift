export type singleEntryResponseType = {
  success: boolean;
  message: string;
  data: {
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
    timeOfDay: string;
    createdAt: string;
    __v: number;
  };
};