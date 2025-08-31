'client';

import { clientApi, safeClientApi } from '@/lib/fetch/clientFetch';
import { CommentType } from '@/lib/types/api/new-types';

const NEWS_API_PREFIX = 'comments';

export const fetchNewsComments = async (newsId: string) => {
  const response = await safeClientApi.get<{
    comments: CommentType[];
    count: number;
  }>(`${NEWS_API_PREFIX}/${newsId}`);

  return response;
};

export const postNewsComment = async (
  newsId: string,
  message: string,
  userName: string,
  parentId: string | null = null
) => {
  const response = await clientApi.post<CommentType>(
    `${NEWS_API_PREFIX}/${newsId}`,
    { message, userName, parentId }
  );
  return response;
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
