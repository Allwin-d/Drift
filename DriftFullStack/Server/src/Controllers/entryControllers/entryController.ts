import type { NextFunction, Request, Response } from "express";
import Entry from "../../Models/EntrySchema/Entry.js";
import type { filterObjType, userType } from "./entryController.types.js";
import geoCoding from "../../Services/geoCoding/geoCoding.service.js";
import getWeather from "../../Services/weather/weather.service.js";
import { sessionRange } from "../../Utils/utilityFunctions.js";
import type { sessionOfDayEnum } from "../../Models/EntrySchema/entrySchema.types.js";
import { createEntryValidation } from "../../Validations/entryValidation.js";

export const createEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Request.user info :", req.user);
    const { _id } = req.user as userType;
    const { content, mood, lat, lng } = req.body;
    console.log("Content details : ", content, mood, lat, lng);
    const result = createEntryValidation.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request payload",
        errors: result.error.issues,
      });
    }

    const [geoLocationDataResponse, weatherDataResponse] = await Promise.all([
      geoCoding(lat, lng),
      getWeather(lat, lng),
    ]);

    const state = geoLocationDataResponse.address.state;
    const place =
      geoLocationDataResponse.address.county ??
      geoLocationDataResponse.address.city ??
      geoLocationDataResponse.address.town ??
      geoLocationDataResponse.address.village ??
      "";

    const placeName = `${place} , ${state}`;

    const tempC = weatherDataResponse?.main?.temp;
    const condition = weatherDataResponse.weather[0]?.main;
    const icon = weatherDataResponse.weather[0]?.icon;

    const hour = new Date().getHours();
    const sessionOfDay: sessionOfDayEnum = sessionRange(hour);

    const userEntry = await Entry.create({
      userId: _id,
      content,
      mood,
      location: {
        coordinates: [lng, lat],
      },
      placeName: placeName,
      weather: {
        tempC: tempC,
        condition: condition ?? "",
        icon: icon ?? "",
      },
      timeOfDay: sessionOfDay,
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
        placeName: userEntry.placeName,
        weather: {
          tempC: userEntry.weather?.tempC,
          condition: userEntry.weather?.condition,
          icon: userEntry.weather?.icon,
        },
        timeOfDay: userEntry.timeOfDay,
        createdAt: userEntry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getEntries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  } catch (error) {
    next(error);
  }
};

export const getSingleEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currentUser = req.user as userType;
    const { id } = req.params;

    const singleEntry = await Entry.findById(id); //this will give a single document that matches an ID

    if (!singleEntry) {
      return res.status(404).json({
        success: false,
        message: `Entry not found`,
      });
    } else {
      if (singleEntry.userId?.toString() !== currentUser._id.toString()) {
        return res.status(403).json({
          status: false,
          message: "Forbidden not your entry",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `ID : ${id} is fetched successfully`,
          data: singleEntry,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deleteEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const currentUser = req.user as userType;
    const { id } = req.params;

    const isEntryExist = await Entry.findById(id); //this will give a single document that matches an ID

    if (!isEntryExist) {
      return res.status(404).json({
        success: false,
        message: `Entry not found`,
      });
    } else {
      if (isEntryExist.userId?.toString() !== currentUser._id.toString()) {
        return res.status(403).json({
          status: false,
          message: "Forbidden not your entry",
        });
      } else {
        const deletedEntry = await Entry.findByIdAndDelete(id);
        return res.status(200).json({
          success: true,
          message: `ID : ${id} is deleted successfully`,
          data: deletedEntry,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export default { createEntry, getEntries, getSingleEntry, deleteEntry };
