import axios from "axios";
import type { geoCodingType } from "./geoCoding.types.js";

const geoCoding = async (lat: number, lng: number) => {
  const GEO_CODING_API = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
  try {
    const response = await axios.get<geoCodingType>(GEO_CODING_API, {
      headers: {
        "User-Agent": "DriftApp/1.0(allwinselva7@gmail.com)",
      },
    });

    const geoCodingData = response.data;
    console.log("GeoCoding Data : ", geoCodingData);
    if (!geoCodingData) {
      throw new Error("Geo Coding Data not Available");
    }
    return geoCodingData;
  } catch (err) {
    throw new Error("Failed to get Geo Coding Data ");
  }
};

export default geoCoding;
