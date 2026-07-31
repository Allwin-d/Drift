import { useState } from "react";
import { upperCase } from "../../utils/utilityFunctions";
import postMarkStamp from "../../assets/postmark-stamp.svg";
import AppTitle from "../../components/AppTitle/AppTitle";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import { LOGIN_API } from "../../url/url";
import type { loginResponseType, userDetailType } from "./login.types";
import toast from "react-hot-toast";
import {
  APP_DESC,
  APP_INTRO,
  CREATE_AN_ACCOUNT,
  EMAIL,
  LOGIN,
  NEW_TO_DRIFT,
  PASSWORD,
  PICK_UP,
  WELCOME_BACK,
} from "../../constants/constantVariables";

const Login = () => {
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState<userDetailType>({
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

  const loginUser = async (userDetail: userDetailType) => {
    const response = await api.post(LOGIN_API, userDetail);
    return response.data;
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: loginResponseType) => {
      toast.success("Logged In Successfully");
      console.log("User Data from Backend", data.data);
      localStorage.setItem("token", data.accessToken);
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to Login ");
    },
  });

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    loginMutation.mutate(userDetail);
  };

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <div className="w-full h-screen flex flex-row">
      {/* Left Side section */}
      <div className="bg-blue-950 w-full  items-center justify-evenly flex flex-col  ">
        <AppTitle />
        <h1 className="text-6xl text-yellow-50 font-bold w-3/6 leading-loose tracking-wider">
          {APP_INTRO}
        </h1>
        <p className="w-2/4 text-3xl leading-relaxed text-gray-400 ">
          {APP_DESC}
        </p>
        <div className="flex flex-row space-x-2 ">
          <img src={postMarkStamp} />
          <div className="flex flex-col items-center justify-center space-y-4 font-bold ">
            <p className="text-gray-400">{upperCase("entry")}#0142</p>
            <p className="text-gray-400">{upperCase("marina beach")}</p>
            <p className="text-green-600">{upperCase("mood")}5/5</p>
          </div>
        </div>
      </div>

      {/*Right side section */}
      <div className="bg-yellow-50 w-full flex items-center justify-center">
        <div className="flex flex-col space-y-10 w-6/12">
          <h1 className="text-5xl font-bold">{WELCOME_BACK}</h1>
          <p className="text-3xl text-gray-500">{PICK_UP}</p>
          <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>
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
              className="p-3 bg-black text-white rounded-md font-bold tracking-widest hover:bg-slate-800"
              onClick={() => handleSubmit}
            >
              {LOGIN}
            </button>
          </form>
          <p className="text-center text-2xl">
            {NEW_TO_DRIFT}
            <span
              className="text-gray-500 cursor-pointer ml-4"
              onClick={handleNavigate}
            >
              {CREATE_AN_ACCOUNT}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
