import { useState } from "react";
import { upperCase } from "../../utils/utilityFunctions";
import postMarkStamp from "../../assets/postmark-stamp.svg";
import AppTitle from "../../components/AppTitle/AppTitle";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LOGIN_API } from "../../url/url";
import type { userDetailType } from "./login.types";
import toast from "react-hot-toast";

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
    const response = await axios.post(LOGIN_API, userDetail);
    return response.data;
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Logged In Successfully");
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
          A journal that remembers where you were.
        </h1>
        <p className="w-2/4 text-3xl leading-relaxed text-gray-400 ">
          Every entry is stamped with the place, the weather, the hour -so the
          patterns in how you feel become something you can see
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
          <h1 className="text-5xl font-bold">Welcome back</h1>
          <p className="text-3xl text-gray-500">
            Pick up where your last entry left{" "}
          </p>
          <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>
            <label className="text-3xl text-gray-500">
              {upperCase("email")}
            </label>
            <input
              className="p-3 text-xl font-medium focus:border-none border-2 border-gray-300"
              type="email"
              name="email"
              placeholder="cristiano7@gmail.com"
              value={userDetail.email}
              onChange={handleChange}
            ></input>
            <label className="text-3xl text-gray-500">
              {upperCase("password")}
            </label>
            <input
              className="p-3 text-xl font-medium focus:border-none border-2 border-gray-300"
              type="password"
              name="passwordHash"
              placeholder="**********"
              value={userDetail.passwordHash}
              onChange={handleChange}
            ></input>
            <button
              className="p-3 bg-black text-white rounded-md font-bold tracking-widest hover:bg-slate-800"
              onClick={() => handleSubmit}
            >
              Log in{" "}
            </button>
          </form>
          <p className="text-center text-2xl">
            New to Drift ?{" "}
            <span
              className="text-gray-500 cursor-pointer"
              onClick={handleNavigate}
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
