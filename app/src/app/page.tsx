"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Reading
          </span>
          <br />
          <span className="text-foreground">
            Reimagined
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Interactive flashcards and immersive stories for modern learning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/flashcards">
            <Button size="lg" className="modern-button px-8 py-4 text-lg font-semibold rounded-2xl min-w-[200px]">
              Start Flashcards
            </Button>
          </Link>
          <Link href="/stories">
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold rounded-2xl border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 min-w-[200px]">
              Browse Stories
            </Button>
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/flashcards" className="story-card p-6 text-center group cursor-pointer">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Flashcards
            </h3>
          </Link>
          
          <Link href="/stories" className="story-card p-6 text-center group cursor-pointer">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Stories
            </h3>
          </Link>
          
          <Link href="/sight-words" className="story-card p-6 text-center group cursor-pointer">
            <div className="text-3xl mb-3">🔤</div>
            <h3 className="font-semibold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              Sight Words
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
