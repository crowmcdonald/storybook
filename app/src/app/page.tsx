"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Layers, Type } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Storybook
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
          Interactive reading tools for early literacy development
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/flashcards">
            <Button size="lg" className="modern-button px-8 py-4 text-lg font-semibold rounded-2xl min-w-[200px]">
              Start Learning
            </Button>
          </Link>
          <Link href="/stories">
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold rounded-2xl border-2 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 min-w-[200px]">
              Read Stories
            </Button>
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/flashcards" className="story-card p-8 text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Flashcards
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Practice sight words with interactive cards
            </p>
          </Link>
          
          <Link href="/stories" className="story-card p-8 text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg group-hover:shadow-pink-500/25 transition-shadow">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Stories
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Engaging stories with highlighted words
            </p>
          </Link>
          
          <Link href="/sight-words" className="story-card p-8 text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg group-hover:shadow-green-500/25 transition-shadow">
              <Type className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              Word Database
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Browse and search sight word collections
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
