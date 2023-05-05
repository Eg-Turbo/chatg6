import React from "react"
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Link } from "react-router-dom";
import classNames from "classnames"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    let [email, isEmailSent] = React.useState(false)
    let [emailAddress,changeEmailAddress] = React.useState("")
  const navigate = useNavigate();
  
  React.useEffect(() => {
        
    if(Cookies.get("token")){
        navigate("/")
    }
}, [])
    return (
        <div className="login-page h-screen w-screen  ">
            <header className="flex items-center justify-between z-10 relative w-full bg-transparent p-4 top-0 left-0">
                <h1 className="text-white text-lg">Chat g6</h1>
                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <button className="px-3 py-1 mr-2 text-white bg-transparent ring-2 ring-primary rounded hover:ring-active focus:ring-active focus:outline-none">
                            Login
            </button>
                    </Link>
                </div>
            </header>
            <div style={{ height: "calc(100vh - 64px)" }}
                className={classNames("flex flex-col items-center relative z-10 justify-center bg-transparent",{
                    "!justify-start":email
                })}>

                    <div className={classNames("login-card bg-transparent relative text-center transition-all duration-300 overflow-hidden rounded-lg p-8 w-72 lg:w-80 ",{
                        "!mt-24 !w-[500px]":email
                    })}>
                {!email ? (
                    <>
                        <h2 className="mb-4 text-xl font-semibold text-white">Forgot password</h2>
                        <ForgotPasswordForm isEmailSent={isEmailSent} changeEmailAddress={changeEmailAddress} />
                    </>
                ) : (
                    <h1 className="text-white text-xl w-full">we sent an email to <span className="font-bold"> {emailAddress}</span> to reset your password </h1>
                )}
                    </div>
            </div>
        </div>
    );
}
