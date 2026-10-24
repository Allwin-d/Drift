import { useState, type ChangeEvent, type FormEvent } from "react";
import { upperCase } from "../../utils/utilityFunctions";
import postMarkStamp from "../../assets/postmark-stamp.svg";
import AppTitle from "../../components/AppTitle/AppTitle";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import { REGISTER_API } from "../../url/url";
import type { registerUserDetailType } from "./register.types";
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerUser = async (userDetail: registerUserDetailType) => {
    const response = await api.post(REGISTER_API, userDetail);
    return response.data;
  };

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registered Successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to register");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate(userDetail);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#020617] lg:flex-row">
      <div className="flex w-full flex-col items-center justify-evenly bg-[#020617] px-5 py-10 text-center lg:w-1/2 lg:px-8 lg:text-left">
        <AppTitle />
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-wider text-yellow-50 sm:text-5xl lg:text-6xl">
            {REGISTER_INTRO}
          </h1>
          <p className="text-lg text-gray-400 sm:text-2xl lg:text-3xl">
            {REGISTER_DESC}
          </p>
        </div>

        <div className="mt-8 flex flex-row items-center gap-4 sm:gap-6">
          <img src={postMarkStamp} alt="postmark stamp" className="h-20 w-20 sm:h-24 sm:w-24" />
          <div className="flex flex-col items-center justify-center gap-2 font-bold lg:items-start">
            <p className="text-sm text-gray-400 sm:text-lg">{upperCase(`${ENTRY}`)}#0001</p>
            <p className="text-sm text-gray-400 sm:text-lg">{upperCase(`${YOUR_FIRST_STAMP}`)}</p>
            <p className="text-sm text-yellow-600 sm:text-lg">{upperCase(`${AWAITS}`)}</p>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-yellow-50 px-4 py-10 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-xl">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {START_YOUR_JOURNAL}
          </h1>
          <p className="mb-8 text-lg text-gray-500 sm:text-2xl">{TAKES_A_MIN}</p>

          <form className="flex flex-col space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            <label className="text-lg font-medium text-gray-500 sm:text-2xl">
              {upperCase(`${NAME}`)}
            </label>
            <input
              className="border-2 border-gray-300 bg-white p-3 text-base font-medium outline-none transition focus:border-gray-500 sm:text-xl"
              type="text"
              name="name"
              placeholder="Cristiano Ronaldo"
              autoComplete="given-name"
              value={userDetail.name}
              onChange={handleChange}
            />

            <label className="text-lg font-medium text-gray-500 sm:text-2xl">
              {upperCase(`${EMAIL}`)}
            </label>
            <input
              className="border-2 border-gray-300 bg-white p-3 text-base font-medium outline-none transition focus:border-gray-500 sm:text-xl"
              type="email"
              name="email"
              placeholder="cristiano7@gmail.com"
              autoComplete="email"
              value={userDetail.email}
              onChange={handleChange}
            />

            <label className="text-lg font-medium text-gray-500 sm:text-2xl">
              {upperCase(`${PASSWORD}`)}
            </label>
            <input
              className="border-2 border-gray-300 bg-white p-3 text-base font-medium outline-none transition focus:border-gray-500 sm:text-xl"
              type="password"
              name="passwordHash"
              placeholder="**********"
              autoComplete="current-password"
              value={userDetail.passwordHash}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="rounded-md bg-black p-3 text-sm font-bold tracking-widest text-white transition-colors duration-700 hover:bg-slate-800 sm:text-base"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating account..." : CREATE_ACCOUNT}
            </button>
          </form>

          <p className="mt-8 text-center text-base sm:text-2xl">
            {ALREADY_JOURNALING}
            <span
              className="ml-2 cursor-pointer text-gray-500 underline-offset-4 hover:underline"
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
