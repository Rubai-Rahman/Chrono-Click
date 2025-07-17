import type { Metadata } from "next";
import ReviewPageContent from "./page-review";

export const metadata: Metadata = {
  title: "Chrono Click - Add Review",
  description: "Add a review for Chrono Click products.",
};

const ReviewPage = () => {
  return <ReviewPageContent />;
};

export default ReviewPage;