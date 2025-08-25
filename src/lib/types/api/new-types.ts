export interface NewsType {
  _id: string;
  slug: string;
  name: string;
  excerpt: string;
  details: string;
  img: string;
  date: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  status: string;
  relatedProducts: string[];
  likes: number;
  views: number;
  commentsEnabled: boolean;
}
