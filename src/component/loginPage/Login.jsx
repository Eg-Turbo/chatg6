import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


import jwt_decode from "jwt-decode";

export default function Login() {

  const navigate = useNavigate();


  const onSuccess = (response) => {
    // console.log('Login successful:', jwt_decode(response.credential));
    // console.log('token:', response.credential);
  };
  const onFailure = (error) => {
    console.error('Login failed:', error);
  };
  React.useEffect(() => {
        
    if(Cookies.get("token")){
        navigate("/")
    }
}, [])
  return (
    <div className="login-page w-screen"  style={{
      height:window.innerHeight
    }}>
      <header className="flex items-center justify-end z-10 relative w-full bg-transparent p-4 pt-12 top-0 left-0">
        <h1 className="text-white text-lg fixed top-[10px] left-[10px]">
                <img src={Logo} alt="Chat g6 logo" className="w-[100px] h-[100px]" />
        </h1>
        <div className="flex items-center gap-3">
          <p className="text-white hidden m-0 sm:block">You don't have an account?</p>
          <Link to="/signup">
            <button className="px-3 py-1 mr-2 text-white bg-transparent ring-2 ring-primary rounded hover:ring-active focus:ring-active focus:outline-none">
              Signup
            </button>
          </Link>
        </div>
      </header>
      <div
        style={{ height: `calc(${window.innerHeight}px - 96px)` }}
        className="flex flex-col items-center relative z-10 justify-center bg-transparent">
        <div className="login-card bg-transparent relative text-center transition-all duration-300 overflow-hidden rounded-lg p-8 w-72 lg:w-80 ">
          <h2 className="mb-4 text-xl font-semibold text-white">Login</h2>
          <LoginForm />
        </div>
        <div className="mt-4  ">

        </div>
        <Link to="/forgot-password" className="mt-4"><p className="text-white text-sm underline">Forgot your password?</p></Link>

      </div>
    </div>
  );
}

