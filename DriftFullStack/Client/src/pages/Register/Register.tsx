import { useState } from "react";
import { upperCase } from "../../utils/utilityFunctions";
import postMarkStamp from "../../assets/postmark-stamp.svg";
import AppTitle from "../../components/AppTitle/AppTitle";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import { REGISTER_API } from "../../url/url";
import type {
  registerResponseType,
  registerUserDetailType,
} from "./register.types";
import toast from "react-hot-toast";
import {
  ALREADY_JOURNALING,
  AWAITS,
  CREATE_ACCOUNT,
  EMAIL,
  ENTRY,
  LOGIN,
  NAME,
  PASSWORD,
  REGISTER_DESC,
  REGISTER_INTRO,
  START_YOUR_JOURNAL,
  TAKES_A_MIN,
  YOUR_FIRST_STAMP,
} from "../../constants/constantVariables";

const Register = () => {
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState<registerUserDetailType>({
    name: "",
    email: "",
    passwordHash: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetail({
      ...userDetail,
      [name]: value,
    });
  };

  console.log("User Details : ", userDetail);

  const registerUser = async (userDetail: registerUserDetailType) => {
    const response = await api.post(REGISTER_API, userDetail);
    return response.data;
  };

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: registerResponseType) => {
      toast.success("Registered Successfully");
      console.log("Register response data :", data.data);
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to Login ");
    },
  });

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    registerMutation.mutate(userDetail);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex flex-row">
      {/* Left Side section */}
      <div className="bg-[#020617] w-full  items-center justify-evenly flex flex-col  ">
        <AppTitle />
        <h1 className="text-6xl text-yellow-50 font-bold w-3/6 leading-loose tracking-wider">
          {REGISTER_INTRO}
        </h1>
        <p className="w-2/4 text-3xl leading-relaxed text-gray-400 ">
          {REGISTER_DESC}
        </p>
        <div className="flex flex-row space-x-2 ">
          <img src={postMarkStamp} />
          <div className="flex flex-col items-center justify-center space-y-4 font-bold ">
            <p className="text-gray-400">{upperCase(`${ENTRY}`)}#0001</p>
            <p className="text-gray-400">{upperCase(`${YOUR_FIRST_STAMP}`)}</p>
            <p className="text-yellow-600">{upperCase(`${AWAITS}`)}</p>
          </div>
        </div>
      </div>

      {/*Right side section */}
      <div className="bg-yellow-50 w-full flex items-center justify-center">
        <div className="flex flex-col space-y-10 w-6/12">
          <h1 className="text-5xl font-bold">{START_YOUR_JOURNAL}</h1>
          <p className="text-3xl text-gray-500">{TAKES_A_MIN}</p>
          <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>
            <label className="text-3xl text-gray-500">
              {upperCase(`${NAME}`)}
            </label>
            <input
              className="p-3 text-xl font-medium focus:border-none border-2 border-gray-300"
              type="name"
              name="name"
              placeholder="Cristiano Ronaldo"
              autoComplete="given-name"
              value={userDetail.name}
              onChange={handleChange}
            ></input>
            <label className="text-3xl text-gray-500">
              {upperCase(`${EMAIL}`)}
            </label>
            <input
              className="p-3 text-xl font-medium focus:border-none border-2 border-gray-300"
              type="email"
              name="email"
              placeholder="cristiano7@gmail.com"
              autoComplete="email"
              value={userDetail.email}
              onChange={handleChange}
            ></input>
            <label className="text-3xl text-gray-500">
              {upperCase(`${PASSWORD}`)}
            </label>
            <input
              className="p-3 text-xl font-medium focus:border-none border-2 border-gray-300"
              type="password"
              name="passwordHash"
              placeholder="**********"
              autoComplete="current-password"
              value={userDetail.passwordHash}
              onChange={handleChange}
            ></input>
            <button
              className="p-3 bg-black text-white rounded-md font-bold tracking-widest transition-colors duration-700 hover:bg-slate-800"
              onClick={() => handleSubmit}
            >
              {CREATE_ACCOUNT}
            </button>
          </form>
          <p className="text-center text-2xl">
            {ALREADY_JOURNALING}
            <span
              className="text-gray-500 cursor-pointer ml-4"
              onClick={handleNavigate}
            >
              {LOGIN}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
