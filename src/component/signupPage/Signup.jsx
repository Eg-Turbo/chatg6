import React from "react"
import { Link } from 'react-router-dom';
import SignupForm from "./SignupForm"
import Logo from "../../assets/logo.png"

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate();

  React.useEffect(() => {
        
    if(Cookies.get("token")){
        navigate("/")
    }
}, [])

  return (
    <div className="login-page h-screen w-screen  ">
      <header className="flex items-center justify-end z-10 relative w-full bg-transparent p-4 pt-12 top-0 left-0">
      <h1 className="text-white text-lg fixed top-[10px] left-[10px]">
                <img src={Logo} alt="Chat g6 logo" className="w-[100px] h-[100px]" />
        </h1>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <button className="px-3 py-1 mr-2 text-white bg-transparent ring-2 ring-primary rounded hover:ring-active focus:ring-active focus:outline-none">
              Login
              </button>
          </Link>
        </div>
      </header>
      <div
        style={{ height: "calc(100vh - 96px)" }}
        className="flex flex-col items-center relative z-10 justify-center bg-transparent">
        <div className="login-card bg-transparent relative text-center transition-all duration-300 overflow-hidden rounded-lg p-8 w-80 lg:w-[350px] ">
          <h2 className="mb-4 text-xl font-semibold text-white">Sign up</h2>
          <SignupForm />
        </div>
      </div>
    </div>
  )
}