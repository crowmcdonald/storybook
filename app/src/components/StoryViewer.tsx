"use client";

import { useState } from 'react';
import Image from 'next/image';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Button } from '@/components/ui/button';

// Custom components for better typography
const mdxComponents = {
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-6 text-gray-100 leading-[1.9] tracking-wide">
      {children}
    </p>
  ),
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mb-6 text-white">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold mb-4 mt-8 text-white">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-bold mb-3 mt-6 text-white">
      {children}
    </h3>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-6 space-y-2 text-gray-100">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="mb-6 space-y-2 text-gray-100">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="ml-6 leading-relaxed">
      {children}
    </li>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold">
      {children}
    </strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic text-purple-400">
      {children}
    </em>
  ),
  u: ({ children }: { children: React.ReactNode }) => (
    <span className="font-bold text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-2">
      {children}
    </span>
  ),
};

export interface StoryViewerProps {
  title: string;
  imagePath: string;
  mdxSource: MDXRemoteSerializeResult;
  onBack?: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ title, imagePath, mdxSource, onBack }) => {
  const [fontSize, setFontSize] = useState(typeof window !== 'undefined' && window.innerWidth < 640 ? 100 : 110); // Smaller default on mobile
  
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 10, 160)); // Max 160%
  };
  
  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 10, 80)); // Min 80%
  };
  
  // Fix image path - ensure it starts with / for relative paths
  const normalizedImagePath = imagePath.startsWith('/') || imagePath.startsWith('http') 
    ? imagePath 
    : `/story-images/${imagePath}`;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        {onBack && (
          <div className="mb-8">
            <Button onClick={onBack} variant="outline" className="rounded-xl text-white border-white/20 hover:bg-white/10 text-sm md:text-base">
              <span className="hidden sm:inline">← Back to Stories</span>
              <span className="sm:hidden">← Back</span>
            </Button>
          </div>
        )}
        
        {/* Story header */}
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 text-white">
            {title}
          </h1>
          
          {imagePath && (
            <div className="mb-4 md:mb-8 flex justify-center">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full max-w-[600px]" style={{ aspectRatio: '4/3' }}>
                <Image 
                  src={normalizedImagePath} 
                  alt={title} 
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 600px"
                  priority
                  onError={(e) => {
                    e.currentTarget.src = '/story-images/placeholder.png';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Story content */}
        <article className="max-w-3xl mx-auto">
          {/* Zoom controls - positioned above story container on desktop */}
          <div className="hidden sm:flex justify-end mb-4">
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-400 font-medium min-w-[40px] text-center bg-gray-900/90 rounded-full px-2 py-1">
                {Math.round(fontSize * 0.9)}%
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={decreaseFontSize}
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0 rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
                  aria-label="Decrease font size"
                >
                  <span className="text-lg">−</span>
                </Button>
                <Button
                  onClick={increaseFontSize}
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0 rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
                  aria-label="Increase font size"
                >
                  <span className="text-lg">+</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile zoom controls - fixed position */}
          <div className="fixed bottom-4 right-4 sm:hidden flex items-center gap-2 z-10">
            <div className="text-xs text-gray-400 font-medium min-w-[40px] text-center bg-gray-900/90 rounded-full px-2 py-1">
              {Math.round(fontSize * 0.9)}%
            </div>
            <div className="flex gap-2">
              <Button
                onClick={decreaseFontSize}
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
                aria-label="Decrease font size"
              >
                <span className="text-lg">−</span>
              </Button>
              <Button
                onClick={increaseFontSize}
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0 rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
                aria-label="Increase font size"
              >
                <span className="text-lg">+</span>
              </Button>
            </div>
          </div>
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 relative border border-gray-800 mt-8 md:mt-16">
            {/* Story content with adjustable font size */}
            <div 
              style={{ fontSize: `${fontSize}%` }} 
              className="transition-all duration-200 story-text"
            >
              <MDXRemote {...mdxSource} components={mdxComponents} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default StoryViewer;