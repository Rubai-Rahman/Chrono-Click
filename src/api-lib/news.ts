export interface NewsStory {
  _id: string;
  name: string;
  details: string;
  img: string;
}

export interface NewsDetailsItem {
  _id: string;
  name: string;
  details: string;
  img: string;
  // Add other properties of your news item here
}

export interface NewsData {
  name: string;
  details: string;
}

export const fetchNews = async (): Promise<NewsStory[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const fetchNewsDetails = async (newsId: string): Promise<NewsDetailsItem> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/${newsId}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const addNews = async (newsData: NewsData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newsData),
  });
  if (!res.ok) {
    throw new Error("Failed to add news");
  }
  return res.json();
};