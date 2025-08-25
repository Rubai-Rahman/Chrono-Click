'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import {
  Newspaper,
  CheckCircle,
  Loader2,
  Plus,
  X,
  Image as ImageIcon,
} from 'lucide-react';

interface NewsData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: 'draft' | 'published';
}

const AddNewsForm = () => {
  const [newsData, setNewsData] = useState<NewsData>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    featuredImage: '',
    status: 'draft',
  });
  const [newTag, setNewTag] = useState('');
  const [success, setSuccess] = useState(false);
  const queryClient = useQueryClient();

  const addNewsMutation = useMutation({
    mutationFn: async (data: NewsData) => {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create news article');
      return response.json();
    },
    onSuccess: () => {
      setSuccess(true);
      setNewsData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: [],
        featuredImage: '',
        status: 'draft',
      });
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
    onError: (error) => {
      console.error('Error creating news:', error);
    },
  });

  const handleInputChange = (field: keyof NewsData, value: string) => {
    setNewsData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !newsData.tags.includes(newTag.trim())) {
      setNewsData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewsData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewsMutation.mutate(newsData);
  };

  console.log(handleSubmit);
  const handleSaveAsDraft = () => {
    const draftData = { ...newsData, status: 'draft' as const };
    addNewsMutation.mutate(draftData);
  };

  const handlePublish = () => {
    const publishData = { ...newsData, status: 'published' as const };
    addNewsMutation.mutate(publishData);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Newspaper className="w-8 h-8 text-primary" />
          Add News Article
        </h1>
        <p className="text-muted-foreground mt-2">
          Create and publish news articles and announcements
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200">
                  Success!
                </p>
                <p className="text-green-700 dark:text-green-300">
                  News article has been created successfully.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Title *
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter article title"
                  value={newsData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium mb-2"
                >
                  Excerpt *
                </label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief summary of the article (will be shown in previews)"
                  value={newsData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  className="min-h-[80px]"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {newsData.excerpt.length}/200 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium mb-2"
                >
                  Content *
                </label>
                <Textarea
                  id="content"
                  placeholder="Write your article content here..."
                  value={newsData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className="min-h-[300px]"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {newsData.content.length} characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label
                  htmlFor="featuredImage"
                  className="block text-sm font-medium mb-2"
                >
                  Image URL
                </label>
                <Input
                  id="featuredImage"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={newsData.featuredImage}
                  onChange={(e) =>
                    handleInputChange('featuredImage', e.target.value)
                  }
                />
                {newsData.featuredImage && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="w-full h-64 relative border rounded-md overflow-hidden">
                      <Image
                        src={newsData.featuredImage}
                        alt="Featured"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            '/placeholder-image.png';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handlePublish}
                  disabled={
                    !newsData.title ||
                    !newsData.content ||
                    !newsData.excerpt ||
                    addNewsMutation.isPending
                  }
                  className="w-full"
                >
                  {addNewsMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    'Publish Now'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveAsDraft}
                  disabled={!newsData.title || addNewsMutation.isPending}
                  className="w-full"
                >
                  {addNewsMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save as Draft'
                  )}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>• Published articles will be visible to all users</p>
                <p>• Drafts can be edited and published later</p>
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={newsData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company-news">Company News</SelectItem>
                  <SelectItem value="product-updates">
                    Product Updates
                  </SelectItem>
                  <SelectItem value="industry-insights">
                    Industry Insights
                  </SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="announcements">Announcements</SelectItem>
                  <SelectItem value="press-releases">Press Releases</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {newsData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newsData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-2">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                <p>Add relevant tags to help users find your article</p>
              </div>
            </CardContent>
          </Card>

          {/* Article Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Article Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Word Count</span>
                <span>
                  {
                    newsData.content
                      .split(' ')
                      .filter((word) => word.length > 0).length
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Character Count</span>
                <span>{newsData.content.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reading Time</span>
                <span>
                  {Math.max(
                    1,
                    Math.ceil(
                      newsData.content
                        .split(' ')
                        .filter((word) => word.length > 0).length / 200
                    )
                  )}{' '}
                  min
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddNewsForm;
