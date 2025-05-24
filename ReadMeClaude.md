# Storybook Architecture Guide

## Project Overview
Storybook is a modern Next.js-based reading application designed for educational purposes. It features interactive flashcards, story reading with vocabulary highlighting, and a clean, modern UI with dark/light theme support.

## Directory Structure

```
storybook/
├── app/                          # Next.js application root
│   ├── src/                      # Source code
│   │   ├── app/                  # App Router pages and layouts
│   │   │   ├── layout.tsx        # Root layout with sidebar navigation
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── flashcards/       # Flashcards feature
│   │   │   │   └── page.tsx      # Flashcard practice page
│   │   │   ├── stories/          # Stories feature
│   │   │   │   └── page.tsx      # Story selection and viewing
│   │   │   ├── upload/           # Story upload feature
│   │   │   │   └── page.tsx      # Upload new stories
│   │   │   └── api/              # API routes
│   │   │       └── upload-story/ # Story upload endpoint
│   │   │           └── route.ts
│   │   ├── components/           # React components
│   │   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   │   ├── Flashcard.tsx     # Individual flashcard display
│   │   │   ├── StoryExplorer.tsx # Story grid and selection
│   │   │   ├── StoryViewer.tsx   # Story reading interface
│   │   │   ├── theme-provider.tsx # Dark/light theme support
│   │   │   └── ui/               # shadcn/ui components
│   │   └── lib/                  # Utility functions
│   │       ├── stories.ts        # Story data management
│   │       ├── rehype-highlight-words.ts # Word highlighting plugin
│   │       └── utils.ts          # General utilities
│   └── public/                   # Static assets
│       ├── content/              # Content files
│       │   ├── stories/          # MDX story files (001.mdx, etc.)
│       │   └── words.txt         # Vocabulary word list
│       ├── story-images/         # Story hero images
│       └── icons/                # UI icons
└── Documentation
    ├── NORTHSTAR.md             # Original project specification
    ├── HOW_TO_ADD_STORIES.md    # Guide for adding new stories
    └── TODO.md                  # Development tasks

```

## Key Files and Their Purpose

### Core Application Files

#### `/app/src/app/layout.tsx`
- **Purpose**: Root layout providing persistent navigation and theme support
- **Key Features**:
  - Mobile-responsive sidebar toggle
  - Theme provider integration
  - Background gradient decorations
  - Manages sidebar open/close state

#### `/app/src/app/page.tsx`
- **Purpose**: Landing page with hero section and feature overview
- **Key Features**:
  - Gradient text effects
  - Feature cards for flashcards and stories
  - Call-to-action buttons
  - Modern, clean design

### Feature Pages

#### `/app/src/app/flashcards/page.tsx`
- **Purpose**: Interactive flashcard practice
- **Key Features**:
  - Word count selection (10, 25, 50, 100)
  - Fisher-Yates shuffle algorithm
  - Progress tracking
  - Session completion celebration
  - Fetches words from `/content/words.txt`

#### `/app/src/app/stories/page.tsx`
- **Purpose**: Story selection and viewing
- **Key Features**:
  - Server-side story loading
  - MDX serialization with word highlighting
  - Passes serialized content to client components

#### `/app/src/app/upload/page.tsx`
- **Purpose**: Upload new stories to the collection
- **Features**: Form for story metadata and content upload

### Components

#### `/app/src/components/Sidebar.tsx`
- **Purpose**: Navigation sidebar with theme toggle
- **Features**:
  - Gradient styling with active states
  - Mobile-responsive with backdrop
  - Theme switcher button
  - Icon-based navigation

#### `/app/src/components/StoryExplorer.tsx`
- **Purpose**: Display story grid and handle selection
- **Features**:
  - Story card grid layout
  - Loading states
  - Image preview
  - Delegates MDX serialization to server action

#### `/app/src/components/StoryViewer.tsx`
- **Purpose**: Display individual stories
- **Features**:
  - Font size controls (zoom)
  - Hero image display
  - MDX content rendering
  - Responsive typography

#### `/app/src/components/Flashcard.tsx`
- **Purpose**: Display individual flashcard
- **Features**:
  - Large, centered word display
  - Gradient text effects
  - Subtle animations
  - Clean, minimalist design

### Library Files

#### `/app/src/lib/stories.ts`
- **Purpose**: Story data management
- **Functions**:
  - `getAllStorySlugs()`: Get all story file names
  - `getStoryData()`: Read and parse individual story
  - `getAllStories()`: Get all stories with metadata

#### `/app/src/lib/rehype-highlight-words.ts`
- **Purpose**: Custom rehype plugin for word highlighting
- **Features**:
  - Highlights vocabulary words in story text
  - Wraps matched words in `<strong><u>` tags
  - Case-insensitive whole-word matching

### Content Structure

#### `/app/public/content/stories/*.mdx`
- **Format**: MDX files with frontmatter
- **Required Frontmatter**:
  ```yaml
  ---
  id: "001"
  title: "Story Title"
  grade: "2nd Grade"
  img: "001.jpg"
  ---
  ```
- **Content**: Markdown-formatted story text

#### `/app/public/content/words.txt`
- **Format**: Plain text, one word per line
- **Purpose**: Vocabulary list for flashcards and highlighting
- **Current**: 96 common sight words

## API Routes

#### `/app/src/app/api/upload-story/route.ts`
- **Purpose**: Handle story uploads
- **Method**: POST
- **Features**: Process and save new story submissions

## Styling Architecture

- **Tailwind CSS**: Primary styling framework
- **Custom Classes**:
  - `.story-card`: Glassmorphism effect cards
  - `.modern-button`: Gradient buttons with hover effects
  - `.flashcard-modern`: Flashcard styling
  - `.nav-item`: Navigation item styling

## State Management

- **Client State**: React hooks (useState, useEffect)
- **Theme State**: next-themes provider
- **No global state management** - components are self-contained

## Data Flow

1. **Stories**: 
   - Server reads MDX files → Parses frontmatter → Serializes with highlighting → Client renders

2. **Flashcards**: 
   - Client fetches words.txt → Shuffles array → Displays cards → Tracks progress

3. **Navigation**: 
   - Sidebar maintains open/close state → Routes handle page changes

## Key Design Patterns

- **Server Components**: Used for data fetching (stories page)
- **Client Components**: Used for interactivity (flashcards, navigation)
- **Server Actions**: MDX serialization with word highlighting
- **Responsive Design**: Mobile-first with breakpoints
- **Accessibility**: ARIA labels, keyboard navigation, zoom controls

## Development Notes

- **Next.js 15.3.2** with App Router
- **TypeScript** for type safety
- **ESLint** for code quality
- **Turbopack** for fast development builds