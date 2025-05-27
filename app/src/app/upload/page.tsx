"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsUploading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await fetch('/api/upload-story', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload story');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/stories');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Upload New Story
          </h1>
          <p className="text-lg text-muted-foreground">
            Add a new story to your collection
          </p>
        </div>

        {/* Back button */}
        <div className="mb-6">
          <Button 
            onClick={() => router.push('/stories')} 
            variant="outline"
            className="hover:bg-accent/80 rounded-2xl px-6"
          >
            ← Back to Stories
          </Button>
        </div>

        {/* Upload form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-8">
            {/* Title input */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium mb-2 text-foreground">
                Story Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
                placeholder="Enter story title..."
                autoComplete="off"
              />
            </div>

            {/* Image upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-foreground">
                Story Image
              </label>
              <div className="space-y-4">
                {imagePreview && (
                  <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-border">
                    <Image
                      src={imagePreview}
                      alt="Story preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full rounded-xl"
                >
                  {imageFile ? 'Change Image' : 'Choose Image'}
                </Button>
              </div>
            </div>

            {/* Story content */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium mb-2 text-foreground">
                Story Content (Markdown supported)
              </label>
              <textarea
                id="content"
                name="content"
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200 font-mono text-sm resize-none"
                placeholder="Write your story here...

You can use:
- **bold text**
- *italic text*
- # Headings

Separate paragraphs with blank lines."
                autoComplete="off"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl">
                Story uploaded successfully! Redirecting...
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isUploading || success}
              className="w-full modern-button text-white py-3 rounded-2xl"
            >
              {isUploading ? 'Uploading...' : 'Upload Story'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}