'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, X } from 'lucide-react';
import { toast } from 'sonner';

interface CommentReplyProps {
  onSubmit: (message: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  placeholder?: string;
}

const CommentReply = ({
  onSubmit,
  onCancel,
  isSubmitting,
  placeholder = 'Write a reply...',
}: CommentReplyProps) => {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    onSubmit(replyText.trim());
    setReplyText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3">
      <Textarea
        placeholder={placeholder}
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        rows={2}
        className="resize-none text-sm"
        disabled={isSubmitting}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <X className="w-3 h-3 mr-1" />
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={!replyText.trim() || isSubmitting}
        >
          {isSubmitting ? (
            'Posting...'
          ) : (
            <>
              <Send className="w-3 h-3 mr-1" />
              Reply
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CommentReply;
