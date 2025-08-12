import axiosInstance from '@/lib/axios';

export interface NewsType {
  _id: string;
  name: string;
  details: string;
  img: string;
  date?: string;
  author: string;
  category: string;
  readTime: string;
  featured: boolean;
}

export interface NewsResponse {
  data: NewsType[];
  count: number;
}

export const fetchNewsPages = async (
  page: number,
  size: number
): Promise<NewsResponse> => {
  const res = await axiosInstance.get(`/news?page=${page}&size=${size}`);
  return res.data;
};

export const fetchNewsDetails = async (newsId: string): Promise<NewsType> => {
  const res = await axiosInstance.get(`/news/${newsId}`);
  return res.data;
};
