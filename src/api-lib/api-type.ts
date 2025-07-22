export interface NewsType {
  _id: string;
  name: string;
  details: string;
  featured?: string;
  category?: string;
  author?: string;
  readTime?: string;
  date: string;
  img: string;
}

export type ReviewType = {
  _id: string;
  name: string;
  comment: string;
  img: string;
  location?: string;
  verified?: boolean;
  rating?: number;
};

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  img: string;
  details: string;
  quantity?: string;
  
}