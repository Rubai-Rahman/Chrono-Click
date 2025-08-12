'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchNewsComments,
  postNewsComment,
  CommentType,
} from '@/api-lib/news';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

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
    mutationFn: (comment: string) =>
      postNewsComment(
        newsId,
        comment,
        user?.name || user?.displayName || 'Anonymous'
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

    commentMutation.mutate(newComment.trim());
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
          <div className="space-y-6">
            {commentsData.comments.map((comment: CommentType) => (
              <div key={comment._id} className="flex gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(comment.user)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-foreground">
                      {comment.user}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(comment.date)}</span>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {comment.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentSection;
