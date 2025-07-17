import type { Metadata } from "next";
import SignUpPageContent from "./page-signup";

export const metadata: Metadata = {
  title: "Chrono Click - Sign Up",
  description: "Create a new Chrono Click account.",
};

const SignUpPage = () => {
  return <SignUpPageContent />;
};

export default SignUpPage;
