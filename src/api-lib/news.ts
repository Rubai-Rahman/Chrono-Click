import axiosInstance from '@/lib/axios';

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
  user: string; // Backend uses 'user' field
  message: string; // Backend uses 'message' field
  date: string; // Backend uses 'date' field
  parentId?: string | null; // null for top-level comments, string for replies
  replyCount?: number; // number of replies to this comment
  replies?: CommentType[]; // nested replies
  likes?: number;
  dislikes?: number;
  userReaction?: 'like' | 'dislike' | null; // current user's reaction
  isDeleted?: boolean;
  updatedAt?: string; // for tracking edits
  isEdited?: boolean; // to show if comment was edited
}

export interface CommentResponse {
  comments: CommentType[];
  count: number;
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
  return res.data.news; // Backend returns { news, comments, commentsPagination }
};

export const fetchNewsComments = async (
  newsId: string
): Promise<CommentResponse> => {
  const res = await axiosInstance.get(
    `/news/${newsId}?commentsPage=1&commentsLimit=50`
  );

  // Backend already returns hierarchical structure, so we just use it directly
  const comments = res.data.comments || [];

  return {
    comments: comments,
    count: res.data.commentsPagination?.total || 0,
  };
};

export const postNewsComment = async (
  newsId: string,
  comment: string,
  userName: string,
  parentId?: string | null
): Promise<CommentType> => {
  const res = await axiosInstance.post('/comments', {
    newsId,
    message: comment,
    user: userName,
    parentId: parentId || null,
  });

  // Return the created comment in the expected format
  return {
    _id: res.data.insertedId,
    newsId,
    user: userName,
    message: comment,
    date: new Date().toISOString(),
    parentId: parentId || null,
  };
};

// Edit comment
export const editNewsComment = async (
  commentId: string,
  message: string
): Promise<CommentType> => {
  const res = await axiosInstance.put(`/comments/${commentId}`, {
    message,
  });
  return res.data;
};

// Delete comment
export const deleteNewsComment = async (commentId: string): Promise<void> => {
  await axiosInstance.delete(`/comments/${commentId}`);
};

// React to comment (like, dislike, or remove reaction)
export const reactToComment = async (
  commentId: string,
  reaction: 'like' | 'dislike' | 'remove'
): Promise<{
  likes: number;
  dislikes: number;
  userReaction: 'like' | 'dislike' | null;
}> => {
  const res = await axiosInstance.post(`/comments/${commentId}/react`, {
    reaction,
  });
  return res.data;
};
