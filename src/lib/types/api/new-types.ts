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
export interface CommentType {
  _id: string;
  newsId: string;
  user: string;
  message: string;
  date: string;
  parentId?: string | null;
  replyCount?: number;
  replies?: CommentType[];
  likes?: number;
  dislikes?: number;
  userReaction?: 'like' | 'dislike' | null;
  isDeleted?: boolean;
  updatedAt?: string;
  isEdited?: boolean;
}

export interface CommentResponse {
  comments: CommentType[];
  count: number;
}

export interface NewsResponse {
  data: NewsType[];
  count: number;
}
