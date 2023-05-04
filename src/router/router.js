import { createBrowserRouter, Navigate, Route } from "react-router-dom";
import Login from "../component/loginPage/Login";
import Signup from "../component/signupPage/Signup";
import LandingPage from "../component/Landing/Land"
import ChatPage from "../component/chatPage/Chat"
import ProtectedRoute from "../component/protectedRoute/ProtectedRoute"
import ForgotPassword from "../component/forgotPassword/Forgotpassword"
import ResetPassword from "../component/resetPassword/ResetPassword"
import Test from "../component/Test";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <LandingPage />
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/chat",
    element: <ProtectedRoute><ChatPage /></ProtectedRoute>,
  },
  {
    path: "/forgot-password",
    element: < ForgotPassword />,
  },
  ,
  {
    path: "/api/v1/auth/password/reset/confirm/:userid/:key",
    element: <ResetPassword />,
  },
  {
    path: "/test",
    element: <Test />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);
