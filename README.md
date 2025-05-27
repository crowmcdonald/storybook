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

4. Open [http://localhost:3000](http://localhost:3000) in your browser

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
├── app/                          # Next.js application
│   ├── src/
│   │   ├── app/                  # App Router pages
│   │   │   ├── flashcards/       # Flashcard practice
│   │   │   ├── stories/          # Story browser & viewer
│   │   │   ├── sight-words/      # Sight word management
│   │   │   └── api/              # API endpoints
│   │   ├── components/           # React components
│   │   └── lib/                  # Utilities & helpers
│   └── public/
│       ├── content/              # Stories and word lists
│       └── story-images/         # Hero images for stories
└── [Python utilities]            # Image generation scripts
```

## 🎯 Key Features Explained

### Word Highlighting System
Stories automatically highlight vocabulary words that appear in the sight word lists. This reinforcement helps learners recognize and remember important words in context.

### Flashcard Algorithm
- Uses Fisher-Yates shuffle for truly random word selection
- "Mark for Revisit" intelligently reinserts words for spaced repetition
- Session state management for smooth learning flow

### Story Management
- MDX format allows rich content with metadata
- Server-side rendering for optimal performance
- Dynamic content loading based on word categories

## 🛠️ Development

### Adding New Stories
1. Create an MDX file in `app/public/content/stories/[small|big]/`
2. Include frontmatter with title, wordType, and image reference
3. Add corresponding image to `app/public/story-images/`

### Customizing Word Lists
- Edit `app/public/content/small-words.txt` for basic words
- Edit `app/public/content/big-words.txt` for complex vocabulary

### Running Tests
```bash
npm run test        # Run test suite
npm run lint        # Check code quality
npm run type-check  # TypeScript validation
```

## 📱 Screenshots

[Add screenshots of your app here]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and the amazing React ecosystem
- Inspired by modern educational technology
- Special thanks to all contributors

---

<p align="center">Made with ❤️ for learners everywhere</p>