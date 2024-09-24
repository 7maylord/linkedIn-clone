import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

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
    <div className="bg-white h-screen flex flex-col justify-center items-center">
      <img src={LinkedinLogo} className="w-[80px]" alt="LinkedIn Logo" />

      <div className="flex flex-col justify-center items-center">
        <h1 className="font-system font-medium text-black opacity-90 text-center">
          Make the most of your professional life
        </h1>

        <div className="flex flex-col gap-2 w-[300px]">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, name: event.target.value })
            }
            type="text"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Email or phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Password (6 or more characters)"
          />
        </div>

        <button
          onClick={register}
          className="w-[300px] h-[50px] bg-[#0073b1] text-white rounded-[30px] font-semibold text-[18px] mt-5 hover:bg-[#004c75]"
        >
          Agree & Join
        </button>
      </div>

      <hr className="relative my-5 border-gray-300 opacity-50 text-black text-center" data-content="or" />

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
  );
}
