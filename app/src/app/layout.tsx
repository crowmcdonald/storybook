"use client";

// import type { Metadata } from "next"; // Metadata can still be exported from client component layouts
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = { // Cannot export metadata from client component layout
//   title: "Storybook App",
//   description: "Reading app for stories and flashcards",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Storybook - Reading & Learning App</title>
        <meta name="description" content="Modern reading app for stories and flashcards with beautiful UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} flex flex-col md:flex-row antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="dark"
        >
          {/* Mobile header */}
          <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
            <div className="flex items-center justify-between p-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="rounded-xl hover:bg-accent/80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Storybook
                </span>
              </div>
              
              <div className="w-10"></div> {/* Spacer for center alignment */}
            </div>
          </div>

          <Sidebar isOpenOnMobile={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
          
          <main className="flex-1 min-h-screen pt-20 md:pt-0 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20 blur-3xl"></div>
            </div>
            
            {/* Main content */}
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
