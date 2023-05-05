import React from "react"
import ResetPasswordForm from "./ResetPasswordForm";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {

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
                    <Link to="/signup">
                        <button className="px-3 py-1 mr-2 text-white bg-transparent ring-2 ring-primary rounded hover:ring-active focus:ring-active focus:outline-none">
                            Signup
            </button>
                    </Link>
                </div>
            </header>
            <div style={{ height: "calc(100vh - 64px)" }}
                className="flex flex-col items-center relative z-10 justify-center bg-transparent">
                <div className="login-card bg-transparent relative text-center transition-all duration-300 overflow-hidden rounded-lg p-8 w-72 lg:w-[21rem] ">
                    <h2 className="mb-8 text-xl font-semibold text-white">Reset password</h2>
                    <ResetPasswordForm />
                </div>
            </div>
        </div>
    );
}
