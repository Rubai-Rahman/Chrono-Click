'client';

import { clientApi } from '@/lib/fetch/clientFetch';
import { CommentType } from '@/lib/types/api/new-types';

const NEWS_API_PREFIX = 'comments';

export const fetchNewsComments = async (newsId: string) => {
  return clientApi.get<{
    comments: CommentType[];
    count: number;
  }>(`${NEWS_API_PREFIX}/${newsId}`);
};

export const postNewsComment = async (
  newsId: string,
  message: string,
  parentId: string | null = null
) => {
  try {
    const response = await clientApi.post<CommentType>(
      `${NEWS_API_PREFIX}/${newsId}`,
      { message, parentId }
    );
    return response;
  } catch (error) {
    console.error('Error in postNewsComment:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    throw error;
  }
};

export const editNewsComment = async (commentId: string, message: string) => {
  const response = await clientApi.put<CommentType>(
    `${NEWS_API_PREFIX}/${commentId}`,
    { message }
  );
  return response;
};

export const deleteNewsComment = async (commentId: string) => {
  const response = await clientApi.delete<{ success: boolean }>(
    `${NEWS_API_PREFIX}/${commentId}`
  );
  return response;
};

export const reactToComment = async (
  commentId: string,
  reaction: 'like' | 'dislike' | 'remove'
) => {
  const response = await clientApi.post<{ success: boolean }>(
    `${NEWS_API_PREFIX}/${commentId}/react`,
    { reaction }
  );
  return response;
};
