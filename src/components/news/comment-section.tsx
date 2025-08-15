'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchNewsComments,
  postNewsComment,
  editNewsComment,
  deleteNewsComment,
  reactToComment,
  CommentType,
} from '@/api-lib/news';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import CommentItem from './comment-item';

interface CommentSectionProps {
  newsId: string;
  commentsEnabled: boolean;
}

const CommentSection = ({ newsId, commentsEnabled }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const { user, isInitialized } = useAuthStore();
  const isAuthenticated = !!user && isInitialized;
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: commentsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['newsComments', newsId],
    queryFn: () => fetchNewsComments(newsId),
    enabled: commentsEnabled,
  });

  const commentMutation = useMutation({
    mutationFn: ({
      comment,
      parentId,
    }: {
      comment: string;
      parentId?: string;
    }) =>
      postNewsComment(
        newsId,
        comment,
        user?.name || user?.displayName || 'Anonymous',
        parentId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsComments', newsId] });
      setNewComment('');
      toast.success('Comment posted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to post comment. Please try again.');
      console.error('Comment error:', error);
    },
  });

  const editMutation = useMutation({
    mutationFn: ({
      commentId,
      message,
    }: {
      commentId: string;
      message: string;
    }) => editNewsComment(commentId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsComments', newsId] });
      toast.success('Comment updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update comment. Please try again.');
      console.error('Edit error:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteNewsComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsComments', newsId] });
      toast.success('Comment deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete comment. Please try again.');
      console.error('Delete error:', error);
    },
  });

  const reactionMutation = useMutation({
    mutationFn: ({
      commentId,
      reaction,
    }: {
      commentId: string;
      reaction: 'like' | 'dislike' | 'remove';
    }) => reactToComment(commentId, reaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsComments', newsId] });
    },
    onError: (error) => {
      toast.error('Failed to update reaction. Please try again.');
      console.error('Reaction error:', error);
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to comment');
      router.push('/login');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    commentMutation.mutate({ comment: newComment.trim() });
  };

  const handleReply = (parentId: string, message: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to reply');
      router.push('/login');
      return;
    }

    commentMutation.mutate({ comment: message, parentId });
  };

  const handleEdit = (commentId: string, message: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to edit comments');
      router.push('/login');
      return;
    }

    editMutation.mutate({ commentId, message });
  };

  const handleDelete = async (commentId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to delete comments');
      router.push('/login');
      return;
    }

    deleteMutation.mutate(commentId);
  };

  const handleReact = async (
    commentId: string,
    reaction: 'like' | 'dislike' | 'remove'
  ) => {
    if (!isAuthenticated) {
      toast.error('Please login to react to comments');
      router.push('/login');
      return;
    }

    return new Promise((resolve, reject) => {
      reactionMutation.mutate(
        { commentId, reaction },
        {
          onSuccess: () => resolve(undefined),
          onError: (error) => reject(error),
        }
      );
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!commentsEnabled) {
    return null;
  }

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Comments ({commentsData?.count || 0})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            placeholder={
              isAuthenticated
                ? 'Share your thoughts...'
                : 'Please login to leave a comment'
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!isAuthenticated}
            rows={3}
            className="resize-none"
          />
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {isAuthenticated ? (
                `Commenting as ${user?.name || user?.displayName}`
              ) : (
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={() => router.push('/login')}
                >
                  Login to comment
                </Button>
              )}
            </div>
            <Button
              type="submit"
              disabled={
                !isAuthenticated ||
                !newComment.trim() ||
                commentMutation.isPending
              }
              size="sm"
            >
              {commentMutation.isPending ? (
                'Posting...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Comments List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-muted-foreground">
            Failed to load comments. Please try again later.
          </div>
        ) : !commentsData?.comments?.length ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {commentsData.comments.map((comment: CommentType) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                onReply={handleReply}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onReact={handleReact}
                isAuthenticated={isAuthenticated}
                isSubmitting={
                  commentMutation.isPending ||
                  editMutation.isPending ||
                  deleteMutation.isPending ||
                  reactionMutation.isPending
                }
                currentUser={user?.name || user?.displayName}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentSection;
