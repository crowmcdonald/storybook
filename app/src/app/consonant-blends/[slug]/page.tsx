"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import FlashcardSession from '@/components/FlashcardSession';
import { Button } from '@/components/ui/button';

// This function would typically be in a lib/data-fetching file
// and run on the server, but for simplicity, we mock it here.
async function getWordsForBlend(slug: string): Promise<string[]> {
  // In a real app, you'd fetch this from your data source.
  // For this example, we'll simulate reading the MDX file.
  // This is a client component, so we can't use fs directly.
  // We will fetch the content from the public directory.
  try {
    const response = await fetch(`/content/consonant-blends/${slug}.mdx`);
    if (!response.ok) return [];
    
    const text = await response.text();
    const content = text.split('---')[2]; // Get content after frontmatter
    if (!content) return [];

    const words = content.trim().split(',').map(w => w.trim()).filter(Boolean);
    return words;

  } catch (error) {
    console.error("Failed to load blend words:", error);
    return [];
  }
}


export default function ConsonantBlendFlashcardPage() {
  const params = useParams<{ slug: string }>();
  const [words, setWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (params.slug) {
      getWordsForBlend(params.slug).then(loadedWords => {
        setWords(loadedWords);
        setIsLoading(false);
      });
    }
  }, [params.slug]);

  const handleSessionComplete = () => {
    router.push('/consonant-blends');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading words...</p></div>;
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Could not find words for this blend.</p>
        <Button onClick={() => router.push('/consonant-blends')}>Go Back</Button>
      </div>
    );
  }

  return (
    <FlashcardSession
      words={words}
      onSessionComplete={handleSessionComplete}
    />
  );
} 