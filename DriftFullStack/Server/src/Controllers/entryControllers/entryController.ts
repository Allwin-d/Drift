import type { Request, Response } from "express";
import Entry from "../../Models/EntrySchema/Entry.js";
import type { filterObjType, userType } from "./entryController.types.js";
import getWeather from "../../Services/weather/weather.service.js";
import type { getWeatherType } from "../../Services/weather/weather.types.js";

export const createEntry = async (req: Request, res: Response) => {
  try {
    console.log("Request.user info :", req.user);
    const { _id } = req.user as userType;
    const { content, mood, lat, lng } = req.body;
    console.log("Content details : ", content, mood, lat, lng);

    const weatherDataResponse: getWeatherType = await getWeather(lat, lng);
    console.log("Weather Data Response : ", weatherDataResponse);

    const tempC = weatherDataResponse?.main?.temp;
    const condition = weatherDataResponse.weather[0]?.main;
    const icon = weatherDataResponse.weather[0]?.icon;

    const userEntry = await Entry.create({
      userId: _id,
      content,
      mood,
      location: {
        coordinates: [lng, lat],
      },
      weather: {
        tempC: tempC,
        condition: condition ?? "",
        icon: icon ?? "",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Entry Created Successfully",
      data: {
        userId: userEntry.userId,
        content: userEntry.content,
        mood: userEntry.mood,
        location: {
          coordinates: userEntry.location?.coordinates,
        },
        weather: {
          tempC: userEntry.weather?.tempC,
          condition: userEntry.weather?.condition,
          icon: userEntry.weather?.icon,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went Wrong",
    });
  }
};

export const getEntries = async (req: Request, res: Response) => {
  try {
    const { page, limit, mood } = req.query;
    const user = req.user as userType;

    const filterObj: filterObjType = {
      userId: user._id,
    };

    if (mood) {
      filterObj.mood = Number(mood);
    }

    const pageNum = page ? Number(page) : 1;
    const limitNum = limit ? Number(limit) : 10;
    const skip = (pageNum - 1) * limitNum;

    const userEntries = await Entry.find(filterObj)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      message: "User Entries fetched successfully",
      data: userEntries,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default { createEntry, getEntries };
