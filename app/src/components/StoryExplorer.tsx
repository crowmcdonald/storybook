"use client";

import React, { useState, startTransition, useRef, useEffect } from 'react';
import { StoryData } from '@/lib/stories';
import StoryViewer from '@/components/StoryViewer';
import { Button } from '@/components/ui/button';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Blocks, Sparkles } from 'lucide-react';

interface StoryExplorerProps {
  smallStories?: StoryData[];
  bigStories?: StoryData[];
  allStories?: StoryData[];
  serializeMdxAction: (rawMdxContent: string, storyType?: string) => Promise<MDXRemoteSerializeResult | null>;
}

type StoryType = 'small' | 'big';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function StoryExplorer({ smallStories = [], bigStories = [], allStories = [], serializeMdxAction }: StoryExplorerProps) {
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoadingStory, setIsLoadingStory] = useState(false);
  const [shuffledStories, setShuffledStories] = useState<StoryData[]>([]);
  const [storyType, setStoryType] = useState<StoryType>('small');
  
  // Refs for each row
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  // Update stories when type changes
  useEffect(() => {
    let stories: StoryData[] = [];
    
    if (storyType === 'small' && smallStories.length > 0) {
      stories = smallStories;
    } else if (storyType === 'big' && bigStories.length > 0) {
      stories = bigStories;
    } else if (allStories.length > 0) {
      // Fallback to all stories for backward compatibility
      stories = allStories;
    }
    
    setShuffledStories(shuffleArray(stories));
    setSelectedStory(null);
    setMdxSource(null);
  }, [storyType, smallStories, bigStories, allStories]);

  // Split stories into three rows
  const rows = [
    shuffledStories.slice(0, Math.ceil(shuffledStories.length / 3)),
    shuffledStories.slice(Math.ceil(shuffledStories.length / 3), Math.ceil(2 * shuffledStories.length / 3)),
    shuffledStories.slice(Math.ceil(2 * shuffledStories.length / 3))
  ];

  const handleStorySelect = async (story: StoryData) => {
    startTransition(() => {
      setSelectedStory(story);
      setIsLoadingStory(true);
    });

    try {
      const serializedContent = await serializeMdxAction(story.content, story.wordType || storyType);
      if (serializedContent) {
        startTransition(() => {
          setMdxSource(serializedContent);
          setIsLoadingStory(false);
        });
      } else {
        throw new Error("Failed to serialize story content");
      }
    } catch (error) {
      console.error("Error processing story:", error);
      startTransition(() => {
        setIsLoadingStory(false);
        setSelectedStory(null);
      });
    }
  };

  const handleBackToList = () => {
    startTransition(() => {
      setSelectedStory(null);
      setMdxSource(null);
    });
  };

  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Show story viewer if a story is selected
  if (selectedStory) {
    if (isLoadingStory || !mdxSource) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <Button onClick={handleBackToList} variant="outline" className="rounded-xl">
                ← Back to Stories
              </Button>
            </div>
            
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Loading &quot;{selectedStory.title}&quot;
            </h2>
            <p className="text-lg text-muted-foreground">
              Preparing your reading adventure...
            </p>
          </div>
        </div>
      );
    }

    return (
      <StoryViewer 
        mdxSource={mdxSource} 
        title={selectedStory.title} 
        imagePath={selectedStory.img}
        onBack={handleBackToList}
      />
    );
  }

  // Show story explorer with categories
  return (
    <div className="min-h-screen">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent animate-gradient-x">
            Story Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your reading adventure from our collection of engaging stories
          </p>
        </div>

        {/* Story Type Toggle - Only show if both types have stories */}
        {smallStories.length > 0 && bigStories.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="flex gap-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-2 rounded-2xl shadow-lg">
              <button
                onClick={() => setStoryType('small')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all transform ${
                  storyType === 'small'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:scale-102'
                }`}
              >
                <Blocks className="w-5 h-5 inline-block mr-2" />
                Small Word Stories
                <span className="ml-2 text-sm opacity-90">({smallStories.length})</span>
              </button>
              <button
                onClick={() => setStoryType('big')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all transform ${
                  storyType === 'big'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:scale-102'
                }`}
              >
                <Sparkles className="w-5 h-5 inline-block mr-2" />
                Big Word Stories
                <span className="ml-2 text-sm opacity-90">({bigStories.length})</span>
              </button>
            </div>
          </div>
        )}

        {/* Story Rows */}
        <div className="space-y-12 max-w-[1400px] mx-auto">
          {rows.map((row, rowIndex) => {
            if (row.length === 0) return null;
            
            const rowRef = rowIndex === 0 ? row1Ref : rowIndex === 1 ? row2Ref : row3Ref;
            
            return (
              <div key={rowIndex} className="relative group/row">
                
                {/* Scroll buttons */}
                <button
                  onClick={() => scrollRow(rowRef, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:bg-background/95"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => scrollRow(rowRef, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:bg-background/95"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Stories Container */}
                <div
                  ref={rowRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {row.map((story) => {
                    const normalizedImagePath = story.img.startsWith('/') || story.img.startsWith('http') 
                      ? story.img 
                      : `/story-images/${story.img}`;

                    return (
                      <div 
                        key={story.slug} 
                        className="flex-none w-64 story-card cursor-pointer group/card transform transition-all duration-300 hover:scale-105 hover:z-10"
                        onClick={() => handleStorySelect(story)}
                      >
                        {/* Story image */}
                        <div className="relative overflow-hidden rounded-t-2xl h-36">
                          <Image 
                            src={normalizedImagePath} 
                            alt={story.title} 
                            fill
                            className="object-cover group-hover/card:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = '/story-images/placeholder.png';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        
                        {/* Story info */}
                        <div className="p-4 bg-gradient-to-b from-background to-muted/20">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover/card:text-primary transition-colors">
                            {story.title}
                          </h3>
                          <div className="flex items-center justify-end">
                            <span className="text-sm font-medium text-primary opacity-0 group-hover/card:opacity-100 transition-opacity">
                              Read →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {shuffledStories.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">
              No {storyType} stories available yet
            </h2>
            <p className="text-muted-foreground">
              Add some .mdx files to /content/stories/{storyType}/
            </p>
          </div>
        )}
      </div>
    </div>
  );
}