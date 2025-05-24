# Project To-Do List

## Phase 1: Initial Setup & Core UI Shell

- **Project Initialization & Basic Setup:**
    - [ ] Initialize Next.js project (with TypeScript).
    - [ ] Set up Tailwind CSS.
    - [ ] Install `shadcn/ui` and configure.
    - [ ] Install `next-themes` for dark mode.
    - [ ] Create a basic `README.md`.

- **Global Layout & Navigation:**
    - [ ] Create `src/components/Layout.tsx`.
        - [ ] Implement persistent left navigation bar structure.
        - [ ] Add placeholder icons/links for Home, Flashcards, Stories.
        - [ ] Define main content area to the right of the nav bar.
    - [ ] Create `src/public/icons/` and add placeholder SVG icons for home, flashcards, stories.
    - [ ] Apply `Layout.tsx` globally in `src/pages/_app.tsx`.
    - [ ] Create basic `src/pages/index.tsx` (Landing Page - "Welcome to Storybook").
    - [ ] Create placeholder `src/pages/flashcards.tsx`.
    - [ ] Create placeholder `src/pages/stories.tsx`.
    - [ ] Ensure basic navigation works between these pages using the left nav bar.

- **Directory Structure & Initial Content Files:**
    - [ ] Create the directory structure outlined in `NORTHSTAR.md` (`/src/components`, `/src/pages`, `/src/styles`, `/content`, `/content/stories`, `/public/story-images`).
    - [ ] Create `content/words.txt` with ~100 sample words.
    - [ ] Create 1-2 sample story files in `content/stories/` (e.g., `001.mdx`) with YAML front-matter and placeholder "Lorem Ipsum" text (3 paragraphs, ~500 words).
    - [ ] Add 1-2 placeholder images to `public/story-images/` (e.g., `001.jpg`).

## Phase 2: Flashcards Feature Implementation

- **Flashcard Component & Logic:**
    - [ ] Create `src/components/Flashcard.tsx`.
        - [ ] Style according to `NORTHSTAR.md` (`rounded-2xl shadow-xl p-8 text-4xl flex items-center justify-center`).
        - [ ] Display a single word passed as a prop.
    - [ ] Implement Flashcard logic in `src/pages/flashcards.tsx`:
        - [ ] Add UI for selecting word count (buttons for 10, 25, 50, 100).
        - [ ] Function to load words from `content/words.txt`.
        - [ ] Fisher-Yates shuffle implementation.
        - [ ] State management for current set of words, current card index.
        - [ ] "Next" and "Previous" button functionality.
        - [ ] Display the `Flashcard.tsx` component with the current word.
    - [ ] Implement "Conclusion Card" display when all cards are viewed.
        - [ ] Add "Start New Session" button on the conclusion card to re-trigger word selection/shuffling.

## Phase 3: Stories Feature Implementation

- **Story Data Handling & Utility Functions:**
    - [ ] Create utility functions (e.g., in `src/lib/stories.ts`) to:
        - [ ] Read all story slugs/IDs from `content/stories/`.
        - [ ] Read front-matter and MDX content for a given story slug.
        - [ ] Parse MDX content.
- **Story Listing on `/stories` page:**
    - [ ] In `src/pages/stories.tsx`, load all story titles (and IDs, maybe grades) using utility functions.
    - [ ] Display a list of available stories (e.g., title as a clickable link).
- **Story Viewer Component:**
    - [ ] Create `src/components/StoryViewer.tsx`.
        - [ ] Props: story data (title, image path, processed content).
        - [ ] Display hero image (scaled to standard size, centered, with border/container).
        - [ ] Display story title.
        - [ ] Display story body content.
- **Displaying Selected Story on `/stories` page:**
    - [ ] In `src/pages/stories.tsx`:
        - [ ] Manage state for the currently selected story.
        - [ ] When a story is selected from the list, fetch its full content.
        - [ ] Render the `StoryViewer.tsx` component with the selected story's data, replacing the story list.
        - [ ] Ensure the page scrolls for long story content.
- **Word Highlighting in Stories:**
    - [ ] Augment story processing/rendering logic to:
        - [ ] Access the list of words from `content/words.txt`.
        - [ ] For each word in the story content that matches a word in `words.txt`, wrap it in a `<strong>` and `<u>` tag (or apply equivalent Tailwind classes). This might involve custom MDX component overrides or post-processing of the HTML.

## Phase 4: Styling & Refinements

- **Theming & Typography:**
    - [ ] Implement dark mode toggle using `next-themes` and `shadcn/ui` theming.
    - [ ] Apply font pairing: sans-serif for UI, serif for story text.
    - [ ] Ensure consistent use of `rounded-2xl`, subtle shadows, and ample white space.
- **Responsive Design:**
    - [ ] Test and refine layout for various screen sizes (desktop, tablet, mobile).
    - [ ] Ensure the left navigation bar adapts or becomes a mobile-friendly menu.
- **Accessibility (Initial Pass):**
    - [ ] Check for basic accessibility: keyboard navigation, sufficient color contrast for text, alt text for images.
- **Code Cleanup & Optimization.**
- **Thorough Local Testing.**

## Phase 5: Future Considerations (Post-MVP)

- **Build & Deployment (Static Export):**
    - [ ] Configure `next export` if full static site is desired.
    - [ ] Explore hosting options (Vercel, AWS S3+CloudFront).
- **Infrastructure as Code (AWS CDK - Python):**
    - [ ] Set up AWS CDK project in `/infra/cdk-python/`.
    - [ ] Define resources for S3 bucket, CloudFront distribution, Route 53 (if custom domain).
- **CI/CD:**
    - [ ] Set up GitHub Actions for automated builds, linting, testing.
    - [ ] (If using S3+CloudFront) Automate deployment via CDK in GitHub Actions.
- **Advanced Features (from Northstar):**
    - [ ] Image optimization (`next-optimized-images` or other tools).
    - [ ] API routes for dynamic story generation (if needed).
    - [ ] Headless CMS integration.
    - [ ] User authentication & progress tracking (e.g., with Supabase).

This provides a more detailed breakdown. How does this look? 