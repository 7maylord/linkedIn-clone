import React from "react";
import Hero from "../assets/hero.svg";
import NavBar from "../components/Navbar";
import Google from "../assets/Google.png";
import { GoogleSignInAPI } from "../api/AuthAPI";
import { useNavigate, Link } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <NavBar />

      <div className="flex flex-col justify-center md:flex-row mt-5 md:items-center md:justify-between px-5 md:pl-20">
        <div className="flex flex-col items-center  md:items-start md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-center md:text-left text-3xl md:text-5xl text-slate-600 mb-6 md:mb-10 leading-10">
            Welcome to your <br></br> professional community
          </h2>

          <button
            className=" max-w-[400px] w-full md:w-full flex items-center justify-center gap-2 border border-gray-700 text-gray-700 p-3 rounded-full mb-4"
            onClick={GoogleSignInAPI}
          >
            <img src={Google} alt="Google logo" className="w-6 h-6" /> Continue
            with Google
          </button>

          <button
            onClick={() => {
              navigate("/Login");
            }}
            className="max-w-[400px] w-full md:w-full bg-white border border-gray-700 text-gray-700 p-3
         rounded-full mb-4"
          >
            Sign in with email
          </button>

          <p className="text-xs text-center md:text-left text-slate-500 mb-3">
            By clicking Continue to join or sign in, you agree to
            LinkedIn&apos;s
            <span className="text-blue-500 font-semibold"> User Agreement</span>
            ,
            <span className="text-blue-500 font-semibold"> Privacy Policy</span>
            , and
            <span className="text-blue-500 font-semibold"> Cookie Policy</span>.
          </p>
          <div className="text-center">
            <span className="text-lg text-center md:text-left text-slate-500">
              New to LinkedIn?{" "}
              <Link to="/Register" className="text-blue-500 font-semibold">
                Join Now
              </Link>
            </span>
          </div>
        </div>

        <div className="flex justify-center md:w-1/2 mb-8 md:mb-0 mt-20">
          <img
            src={Hero}
            alt="Hero Learning Image"
            className="w-full md:w-11/12"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
