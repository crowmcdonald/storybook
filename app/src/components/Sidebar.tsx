"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "/icons/home.svg" },
  { href: "/flashcards", label: "Flashcards", icon: "/icons/flashcards.svg" },
  { href: "/stories", label: "Stories", icon: "/icons/stories.svg" },
  { href: "/sight-words", label: "Sight Words", icon: "/icons/book.svg" },
  { href: "/upload", label: "Upload Story", icon: "/icons/upload.svg" },
];

interface SidebarProps {
  isOpenOnMobile: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpenOnMobile, closeSidebar }: SidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (isOpenOnMobile) {
      closeSidebar();
    }
  };

  // Base classes for the sidebar with modern styling
  let sidebarClasses = `
    w-72 h-screen sticky top-0 transition-all duration-300 ease-in-out
    bg-gradient-to-b from-sidebar/95 to-sidebar/90 backdrop-blur-xl
    border-r border-sidebar-border/50
    flex flex-col
  `;

  // Apply transform based on mobile state
  if (isOpenOnMobile) {
    sidebarClasses += " fixed md:sticky translate-x-0 z-40";
  } else {
    sidebarClasses += " fixed md:sticky -translate-x-full md:translate-x-0 z-40";
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpenOnMobile && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <aside className={sidebarClasses}>
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Storybook
              </h1>
              <p className="text-xs text-muted-foreground">Reading & Learning</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    onClick={handleLinkClick} 
                    className={`
                      nav-item group relative flex items-center p-4 rounded-2xl transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/25' 
                        : 'hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 text-sidebar-foreground/70 hover:text-sidebar-foreground'
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                    )}
                    
                    {/* Icon container with modern styling */}
                    <div className={`
                      w-8 h-8 rounded-xl flex items-center justify-center mr-4 transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' 
                        : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30'
                      }
                    `}>
                      <Image 
                        src={item.icon} 
                        alt={item.label} 
                        width={16} 
                        height={16} 
                        className={`transition-all duration-300 ${isActive ? 'brightness-0 invert' : 'brightness-0 invert opacity-60 group-hover:opacity-80'}`}
                        style={{ filter: isActive ? 'invert(1)' : 'invert(1) sepia(1) saturate(2) hue-rotate(230deg) brightness(0.7)' }}
                      />
                    </div>
                    
                    <span className={`
                      font-medium transition-all duration-300
                      ${isActive ? 'font-semibold' : ''}
                    `}>
                      {item.label}
                    </span>

                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-sidebar-border/30">
          {/* Version or credits */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              v1.0 • Built with ❤️
            </p>
          </div>
        </div>
      </aside>
    </>
  );
} 