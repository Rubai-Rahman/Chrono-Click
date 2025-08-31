import { safeApi } from '@/lib/fetch/serverFetch';
import { NewsResponse, NewsType, CommentType } from '@/lib/types/api/new-types';

// News related functions

export const fetchNewsData = async <T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
) => {
  return await safeApi.get<T>(path, {
    next: {
      revalidate: opts?.next?.revalidate ?? 30000,
      tags: opts?.next?.tags ?? ['news'],
    },
  });
};

export const fetchNewsPages = async (
  page: number,
  size: number,
  sort: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
) => {
  const result = await safeApi.get<NewsResponse>(
    `/news?page=${page}&size=${size}&sort=${sort}`,
    {
      next: {
        revalidate: opts?.next?.revalidate ?? 30000,
        tags: opts?.next?.tags ?? ['news'],
      },
    }
  );

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || 'Failed to fetch news');
  }

  return result.data;
};

export const fetchNewsDetails = async (
  newsId: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
) => {
  const result = await safeApi.get<{ news: NewsType }>(`/news/${newsId}`, {
    next: {
      revalidate: opts?.next?.revalidate,
      tags: opts?.next?.tags,
    },
  });

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || 'Failed to fetch news details');
  }

  return result.data.news;
};

export const fetchNewsComments = async (
  newsId: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
) => {
  const result = await safeApi.get<{
    comments: CommentType[];
    commentsPagination: { total: number };
  }>(`/news/${newsId}?commentsPage=1&commentsLimit=50`, {
    next: {
      revalidate: opts?.next?.revalidate,
      tags: opts?.next?.tags,
    },
  });

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || 'Failed to fetch comments');
  }

  return {
    comments: result.data.comments || [],
    count: result.data.commentsPagination?.total || 0,
  };
};

export const postNewsComment = async (
  newsId: string,
  comment: string,
  userName: string,
  parentId?: string | null
) => {
  const result = await safeApi.post<{ insertedId: string }>('/comments', {
    newsId,
    message: comment,
    user: userName,
    parentId: parentId || null,
  });

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || 'Failed to post comment');
  }

  return {
    _id: result.data.insertedId,
    newsId,
    user: userName,
    message: comment,
    date: new Date().toISOString(),
    parentId: parentId || null,
  } as CommentType;
};

export const editNewsComment = async (commentId: string, message: string) => {
  const result = await safeApi.put<CommentType>(`/comments/${commentId}`, {
    message,
  });

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || 'Failed to edit comment');
  }

  return result.data;
};

export const deleteNewsComment = async (commentId: string) => {
  const result = await safeApi.delete(`/comments/${commentId}`);

  if (!result.success) {
    throw new Error(result.error?.message || 'Failed to delete comment');
  }
};

export const reactToComment = async (
  commentId: string,
  reaction: 'like' | 'dislike' | 'remove'
) => {
  const result = await safeApi.post<{
    likes: number;
    dislikes: number;
    userReaction: 'like' | 'dislike' | null;
  }>(`/comments/${commentId}/react`, { reaction });

  if (!result.success || !result.data) {
    throw new Error(result.error?.message || 'Failed to react to comment');
  }

  return result.data;
};
