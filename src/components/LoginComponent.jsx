import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed In to LinkedIn!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col justify-center items-center">
      <img src={LinkedinLogo} className="w-[80px]" alt="LinkedIn Logo" />

      <div className="flex flex-col justify-center items-center">
        <h1 className="font-system font-medium text-black opacity-90 text-center">
          Sign in
        </h1>
        <p className="mt-[-20px] font-system text-center">
          Stay updated on your professional world
        </p>

        <div className="flex flex-col gap-2 w-[300px]">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Password"
          />
        </div>
        <button
          onClick={login}
          className="w-[300px] h-[50px] bg-[#0073b1] text-white rounded-[30px] font-semibold text-[18px] mt-5 hover:bg-[#004c75]"
        >
          Sign in
        </button>
      </div>

      <hr className="relative my-5 border-gray-300 opacity-50 text-black text-center" data-content="or" />

      <div className="flex flex-col justify-center items-center">
        <p className="text-[18px]">
          New to LinkedIn?{" "}
          <span
            className="text-[#0072b1] cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}
