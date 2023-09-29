// authRoutes.tsx
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/Forgot_Password/Forgot_Password";
import ResetPasswordConfirmation from "../pages/Auth/Forgot_Password/Forgot_Pass_Confirmation";
import EmailVerification from "../pages/Auth/Email_Verification";
import PrivateRoute from "./privateRoute";

const authRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/reset-confirmation/:email",
    element: <ResetPasswordConfirmation />,
  },
  {
    path: "/email-verification",
    element: (
      <PrivateRoute>
        <EmailVerification />
      </PrivateRoute>
    ),
  },
];

export default authRoutes;
