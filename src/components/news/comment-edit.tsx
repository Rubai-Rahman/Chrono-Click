'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface CommentEditProps {
  initialMessage: string;
  onSave: (message: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const CommentEdit = ({
  initialMessage,
  onSave,
  onCancel,
  isSubmitting,
}: CommentEditProps) => {
  const [editText, setEditText] = useState(initialMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (editText.trim() === initialMessage.trim()) {
      toast.error('No changes made');
      onCancel();
      return;
    }

    onSave(editText.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        rows={3}
        className="resize-none text-sm"
        disabled={isSubmitting}
        autoFocus
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
          disabled={!editText.trim() || isSubmitting}
        >
          {isSubmitting ? (
            'Saving...'
          ) : (
            <>
              <Save className="w-3 h-3 mr-1" />
              Save
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CommentEdit;
