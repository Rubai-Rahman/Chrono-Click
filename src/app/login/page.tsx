import type { Metadata } from "next";
import LoginPageContent from "./page-login";

export const metadata: Metadata = {
  title: "Chrono Click - Login",
  description: "Login to your Chrono Click account.",
};

const LoginPage = () => {
  return <LoginPageContent />;
};

export default LoginPage;
