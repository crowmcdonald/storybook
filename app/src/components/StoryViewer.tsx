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
    <strong className="font-bold text-blue-400">
      {children}
    </strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic text-purple-400">
      {children}
    </em>
  ),
};

export interface StoryViewerProps {
  title: string;
  imagePath: string;
  mdxSource: MDXRemoteSerializeResult;
  onBack?: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ title, imagePath, mdxSource, onBack }) => {
  const [fontSize, setFontSize] = useState(110); // Start with slightly larger text
  
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
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        {onBack && (
          <div className="mb-8">
            <Button onClick={onBack} variant="outline" className="rounded-xl text-white border-white/20 hover:bg-white/10">
              ← Back to Stories
            </Button>
          </div>
        )}
        
        {/* Story header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            {title}
          </h1>
          
          {imagePath && (
            <div className="mb-8 flex justify-center">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image 
                  src={normalizedImagePath} 
                  alt={title} 
                  width={600}
                  height={450}
                  className="object-cover"
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
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 relative border border-gray-800">
            {/* Zoom controls */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
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
            
            {/* Font size indicator */}
            <div className="absolute top-4 right-24 text-xs text-gray-500">
              {Math.round(fontSize * 0.9)}%
            </div>
            
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