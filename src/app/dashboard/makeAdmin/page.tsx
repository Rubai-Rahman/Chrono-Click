import type { Metadata } from "next";
import MakeAdminPageContent from "./page-makeAdmin";

export const metadata: Metadata = {
  title: "Chrono Click - Make Admin",
  description: "Grant admin privileges to a user.",
};

const MakeAdminPage = () => {
  return <MakeAdminPageContent />;
};

export default MakeAdminPage;