import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import linkedInLogo from "../assets/linkedin.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { GoogleSignInAPI } from "../api/AuthAPI";
import Google from "../assets/Google.png";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Account Created!");
      postUserData({
        userID: uuidv4(),
        name: credentials.name,
        email: credentials.email,
        imageLink:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };

  return (
    <div className="bg-neutral-100 max-w-screen flex flex-col justify-center h-screen ">
      <div className="mb-1 self-start ml-10">
        <img src={linkedInLogo} className="w-28 h-20" alt="LinkedIn Logo" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-system font-semibold text-2xl text-black opacity-90 m-10 text-center">
          Make the most of your professional life
        </h1>
        <div className="bg-white p-4 flex flex-col items-center ">
          <form className="flex flex-col gap-2 w-[350px]">
            <label
              htmlFor="emailForm"
              className="text-sm font-medium text-left block"
            >
              Email or phone number
            </label>
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, email: event.target.value })
              }
              type="text"
              id="emailForm"
              className="border border-black rounded-md h-8 w-full mb-5"
            />
            <label
              htmlFor="password"
              className="text-sm font-medium text-left block"
            >
              Password (6+ characters)
            </label>
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, password: event.target.value })
              }
              type="password"
              id="password"
              className="border border-black rounded-md h-8 w-full mb-5"
            />
            <div className="flex justify-start items-center mb-5">
              <input type="checkbox" className="accent-green-800 h-6 w-6" />
              <span className="text-sm ml-2">Remember me</span>
            </div>
            <p className="text-xs text-center my-3">
              By clicking Agree & Join or Continue to join, you agree to
              LinkedIn&apos;s
              <span className="text-blue-500 font-semibold">
                {" "}
                User Agreement
              </span>
              ,
              <span className="text-blue-500 font-semibold">
                {" "}
                Privacy Policy
              </span>
              , and
              <span className="text-blue-500 font-semibold">
                {" "}
                Cookie Policy
              </span>
              .
            </p>
          </form>

          <button
            onClick={register}
            className="w-[350px] h-[50px] bg-[#0073b1] text-white rounded-[30px] font-semibold text-[18px] mt-5 hover:bg-[#004c75]"
          >
            Agree & Join
          </button>
          <div className="flex items-center justify-center">
            <div className="flex-1 border-t border-gray-400 h-px"></div>
            <span className="mx-2 bg-white px-2">or</span>
            <div className="flex-1 border-t border-gray-400 h-px"></div>
          </div>

          <button
            className=" max-w-[300px] w-full md:w-full flex items-center justify-center gap-2 border border-gray-700 hover:border-black text-gray-700 p-3 rounded-full mb-4"
            onClick={GoogleSignInAPI}
          >
            <img src={Google} alt="Google logo" className="w-6 h-6" /> Continue
            with Google
          </button>
        </div>

        
        <div className="flex flex-col justify-center items-center">
          <p className="text-[18px]">
            Already on LinkedIn?{" "}
            <span
              className="text-[#0072b1] cursor-pointer"
              onClick={() => navigate("/Login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
