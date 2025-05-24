# Northstar Document: Reading Web App

This document outlines the core features, content structure, and design principles for the Reading Web App. Its purpose is to guide development and ensure alignment with the project's goals.

## 1. Repo Layout

The project will follow this directory structure (a `Layout.tsx` component for the persistent navigation is implied):

```bash
/README.md
/infra/cdk-python/         # IaC (AWS CDK with Python)
/src/                      # Next.js app
  components/
    Layout.tsx             # Handles persistent left navigation and page content
    Flashcard.tsx
    StoryViewer.tsx
  pages/
    _app.tsx               # To apply the global layout
    index.tsx              # Landing page
    flashcards.tsx
    stories.tsx            # Story selection and display page
    # story/[id].tsx       # Retained for potential future static generation of individual stories if needed
  styles/                  # Tailwind config
/content/
  words.txt                # one word per line (≈100 sample words initially)
  stories/
    001.mdx
    002.mdx
    ...                    # Sample stories with placeholder text initially
/public/
  story-images/            # JPEG/PNG per story (same 3-digit id)
  icons/                   # Icons for navigation (home, flashcards, stories)
```

## 2. Content Conventions

### `words.txt`
- A plain text file with one word per line.
- Start with approximately 100 sample words for development.
- This list will be parsed for flashcards and for highlighting words within stories.

### `stories/###.mdx`
- Each story is an MDX file (e.g., `001.mdx`).
- Files begin with YAML front-matter:
  ```yaml
  ---
  id: "001" # String ID, corresponds to file name and image name
  title: "The Placeholder Adventure"
  img: "/story-images/001.jpg"
  ---
  ```
- Body: Initially, placeholder text (e.g., 3 paragraphs of "Lorem Ipsum", ~500 words total) to test layout and scrolling. The page must accommodate long-form content with vertical scrolling.
- **Word Highlighting:** Any word from `content/words.txt` that appears in the story's main body text must be automatically **bolded and underlined** when the story is displayed.

### Story Images (`public/story-images/`)
- One hero image per story, displayed top and center above the story title.
- **Consistent Sizing:** All story images will be scaled to a standard size (e.g., 400px width, 300px height, or similar aspect ratio that maintains visual quality). They should be displayed within a container, possibly with a border, to ensure uniformity.

## 3. Flashcards Page (`/flashcards`)

- **Route:** `/flashcards` (accessed via the persistent left navigation).
- **Functionality:**
    - **Word Count Selection:** Users will choose how many words to study from predefined options: 10, 25, 50, or 100 words.
    - **Word Loading & Shuffling:**
        - The word list from `content/words.txt` is loaded.
        - The selected number of words are randomly shuffled (Fisher-Yates).
    - **Card Display:**
        - Each selected word `w` is rendered as a `<Flashcard word={w}/>` component.
        - A single word is displayed per card. No "back" of the card.
    - **Navigation:** "Next" and "Previous" buttons/actions to move through the set of flashcards.
    - **Conclusion:** After the last card in the set, a "Conclusion Card" (e.g., "The End! Great Job!") is displayed. This card should offer an option to start a new flashcard session (generate a new set of cards).
- **Design:**
    - Each flashcard: `div` with `rounded-2xl shadow-xl p-8 text-4xl flex items-center justify-center`.

## 4. Story Section Page (`/stories`)

- **Route:** `/stories` (accessed via the persistent left navigation).
- **Functionality:**
    - **Initial View:** Upon navigating to this page, a default view is presented, likely showing a list of available stories. Titles (and optionally grades or thumbnails) are loaded from story front-matter.
    - **Story Selection:** Users select a story from this list.
    - **Story Display:**
        - The selected story's content (hero image, title, highlighted body text) replaces the story list or default view within the main content area of the `/stories` page.
        - A `StoryViewer` component will render these elements.
        - Word highlighting (bold and underline for words from `words.txt`) is applied to the story body.
        - Story images are displayed scaled and centered.
        - The content area allows for vertical scrolling for longer stories.
- **Static Generation (Note):** While the primary interaction described is dynamic on the `/stories` page, the structure for `story/[id].tsx` and `getStaticPaths`/`getStaticProps` (as mentioned in repo layout) should be kept in mind for potential future optimization if direct linking to or pre-rendering individual stories becomes a requirement. For the MVP, the focus is on the single-page application feel for story browsing.

## 5. Look & Feel

- **Persistent Left Navigation Bar:**
    - A vertical navigation bar will be fixed on the left side of all pages.
    - It will contain three icons (with optional text labels if space/design allows):
        1.  **Home Icon:** Links to the landing page (`/`).
        2.  **Flashcards Icon:** Links to `/flashcards`.
        3.  **Stories Icon:** Links to `/stories`.
- **Main Content Area:** To the right of the left navigation bar, where page-specific content is rendered.
- **Styling Framework:** Tailwind CSS.
- **UI Components:** Utilize `shadcn/ui` for pre-built components.
- **Typography:** Sans-serif for general text/UI, serif for story text.
- **Design Language:** Ample white space, `rounded-2xl` corners, subtle shadows.
- **Theme:** Dark mode toggle via `next-themes`.

## 6. Landing Page (`/`)

- **Route:** `/` (accessed via the Home icon in the persistent left navigation).
- **Content:** A simple welcome message, e.g., "Welcome to Storybook".

## 7. Future Considerations

(These sections remain as previously defined, focusing on post-MVP enhancements like hosting, CI, advanced content management, and user accounts. The IaC approach will be AWS CDK with Python.)

### 7.1 Cheap Extras
- Use GitHub Actions caches to speed builds; runs are free for public repos.
- Images: compress with `next-optimized-images` or TinyPNG CLI before commit.
- Domain: buy once, ~$12/yr; Vercel and CloudFront give free certs.

### 7.2 Extending Later
- Add `/api/stories?grade=2&count=10` via Next.js API routes if you ever move to dynamic story generation.
- Swap Markdown for a headless CMS (e.g. Notion, Sanity) without touching UI.
- Add login & per-student progress with Supabase; still deploy static. 