export interface TestimonialItem {
  _id: string;
  img: string;
  name: string;
  comment: string;
}

export interface ReviewData {
  review: string;
  name: string;
}

export const fetchTestimonials = async (): Promise<TestimonialItem[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const addReview = async (reviewData: ReviewData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) {
    throw new Error('Failed to add review');
  }
  return res.json();
};
