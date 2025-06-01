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

// Sort stories alphabetically by title
function sortStoriesAlphabetically(stories: StoryData[]): StoryData[] {
  return [...stories].sort((a, b) => a.title.localeCompare(b.title));
}

export default function StoryExplorer({ smallStories = [], bigStories = [], allStories = [], serializeMdxAction }: StoryExplorerProps) {
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoadingStory, setIsLoadingStory] = useState(false);
  const [sortedStories, setSortedStories] = useState<StoryData[]>([]);
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
    
    setSortedStories(sortStoriesAlphabetically(stories));
    setSelectedStory(null);
    setMdxSource(null);
  }, [storyType, smallStories, bigStories, allStories]);

  // Split stories into rows - 2 on mobile, 4 on desktop
  const storiesPerRow = typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 4;
  const rows = [];
  for (let i = 0; i < sortedStories.length; i += storiesPerRow) {
    rows.push(sortedStories.slice(i, i + storiesPerRow));
  }

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
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent animate-gradient-x">
            Story Library
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Choose your reading adventure from our collection of engaging stories
          </p>
        </div>

        {/* Story Type Toggle - Only show if both types have stories */}
        {smallStories.length > 0 && bigStories.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="flex flex-col sm:flex-row gap-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-2 rounded-2xl shadow-lg max-w-full sm:max-w-fit mx-auto">
              <button
                onClick={() => setStoryType('small')}
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all transform text-sm sm:text-base ${
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
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all transform text-sm sm:text-base ${
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

        {/* Story Grid for Mobile */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-2 gap-3 px-2">
            {sortedStories.map((story) => {
              const normalizedImagePath = story.img.startsWith('/') || story.img.startsWith('http') 
                ? story.img 
                : `/story-images/${story.img}`;

              return (
                <div 
                  key={story.slug} 
                  className="story-card cursor-pointer group/card transform transition-all duration-300 active:scale-95"
                  onClick={() => handleStorySelect(story)}
                >
                  {/* Story image */}
                  <div className="relative overflow-hidden rounded-t-xl h-32">
                    <Image 
                      src={normalizedImagePath} 
                      alt={story.title} 
                      fill
                      className="object-cover object-center"
                      sizes="50vw"
                      onError={(e) => {
                        e.currentTarget.src = '/story-images/placeholder.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  {/* Story info */}
                  <div className="p-3 bg-gradient-to-b from-background to-muted/20">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {story.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story Rows for Desktop */}
        <div className="hidden sm:block space-y-12 max-w-[1600px] mx-auto">
          {rows.map((row, rowIndex) => {
            if (row.length === 0) return null;
            
            const rowRef = rowIndex === 0 ? row1Ref : rowIndex === 1 ? row2Ref : row3Ref;
            
            return (
              <div key={rowIndex} className="relative group/row">
                
                {/* Scroll buttons */}
                <button
                  onClick={() => scrollRow(rowRef, 'left')}
                  className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-background/95 backdrop-blur-sm rounded-full p-4 shadow-xl opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110 items-center justify-center"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => scrollRow(rowRef, 'right')}
                  className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-background/95 backdrop-blur-sm rounded-full p-4 shadow-xl opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110 items-center justify-center"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-8 h-8" />
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
                        <div className="relative overflow-hidden rounded-t-2xl h-48">
                          <Image 
                            src={normalizedImagePath} 
                            alt={story.title} 
                            fill
                            className="object-cover object-center group-hover/card:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        {sortedStories.length === 0 && (
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