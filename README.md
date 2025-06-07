# 📚 Storybook - Modern Reading Education Platform

An interactive reading education app built with Next.js, featuring flashcards, immersive stories, and sight word practice for learners of all ages.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 📖 **Interactive Stories**
- 50+ engaging stories with beautiful hero images
- Automatic vocabulary highlighting for learning reinforcement
- Categorized by reading level (small words/big words)
- Responsive typography with zoom controls
- Netflix-style browsing interface

### 🎯 **Smart Flashcards**
- Practice with 10, 25, 50, or 100 words per session
- Small words (3-4 letter foundation words) and Big words (complex vocabulary)
- "Mark for Revisit" feature - flagged words reappear 3-4 cards later
- Progress tracking with visual indicators
- Celebratory completion animations

### 🔤 **Sight Words Management**
- Comprehensive sight word library
- Add custom sight words to the collection
- Words automatically highlighted in stories
- Separate tracking for small and big word categories

### 🎨 **Modern UI/UX**
- Beautiful dark theme with gradient accents
- Glassmorphism design elements
- Smooth animations and transitions
- Mobile-responsive layout
- Accessible navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Python 3.x (for content generation scripts)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/crowmcdonald/storybook.git
cd storybook
```

2. Install dependencies:
```bash
cd app
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework**: Next.js 15.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **Content**: MDX for rich story content
- **UI Components**: Custom components with shadcn/ui patterns
- **Theme**: next-themes for dark mode
- **Parsing**: gray-matter for frontmatter, rehype for content processing

## 📁 Project Structure

```
storybook/
├── app/              # Next.js application
│   ├── public/       # Static assets
│   └── src/          # Source code
├── python_scripts/   # Python utility scripts
└── package.json
```

## Content Generation

This project includes several Python scripts in the `python_scripts` directory to help with content creation.

### `generate_story_images.py`
Creates `story_image_prompts.json` with prompts for AI image generation.

### `create_themed_placeholders.py`
Generates themed placeholder images for stories using the Pillow library. You may need to install it: `pip install Pillow`.

### `list_stories.py`
A utility script to list all story titles and their image filenames.

## 🛠️ Development

### Adding New Stories
See `HOW_TO_ADD_STORIES.md` for a detailed guide.

### Customizing Word Lists
- Edit `app/public/content/small-words.txt`
- Edit `app/public/content/big-words.txt`

### Running Tests
```bash
npm run test
npm run lint
npm run type-check
```

## 🤝 Contributing

Contributions are welcome! Please submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js and the React ecosystem.
- Inspired by modern educational technology.

---

<p align="center">Made with ❤️ for learners everywhere</p>