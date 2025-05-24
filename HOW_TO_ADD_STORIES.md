# How to Add New Stories

This guide explains how to add new stories to your Storybook application with custom images.

## Overview

Stories are stored as MDX files in the `/app/public/content/stories/` directory. Each story requires:
1. An MDX file with story content and metadata
2. An image file for the story thumbnail

## Step-by-Step Guide

### 1. Prepare Your Story Image

- Place your story image in `/app/public/story-images/`
- Recommended format: JPG or PNG
- Recommended size: 500x375px (or similar aspect ratio)
- Name it descriptively (e.g., `dragon-adventure.jpg`)

### 2. Create Your Story File

Create a new MDX file in `/app/public/content/stories/` with a numbered filename (e.g., `002.mdx`, `003.mdx`, etc.)

### 3. Add Story Metadata

At the top of your MDX file, add the frontmatter with these required fields:

```mdx
---
id: "002"
title: "Your Story Title"
img: "your-image-name.jpg"
---
```

- `id`: Unique identifier (typically matches the filename number)
- `title`: The story title displayed in the UI
- `img`: Filename of your image in the `story-images` folder

### 4. Write Your Story Content

After the frontmatter, write your story using Markdown syntax:

```mdx
# Your Story Title

Once upon a time...

Your story paragraphs go here. You can use **bold text**, *italic text*, and other Markdown formatting.

Each paragraph should be separated by a blank line for proper formatting.
```

## Example: Adding a New Story

### Step 1: Add Image
Place `dragon-adventure.jpg` in `/app/public/story-images/`

### Step 2: Create Story File
Create `/app/public/content/stories/002.mdx`:

```mdx
---
id: "002"
title: "The Dragon's Secret"
img: "dragon-adventure.jpg"
---

# The Dragon's Secret

In a faraway kingdom, there lived a young dragon named Spark who was different from all the other dragons...

Spark couldn't breathe fire like his friends. Instead, when he tried, beautiful rainbow bubbles came out!

At first, Spark felt embarrassed. But one day, the kingdom needed help...
```

## Adding Multiple Stories

To add 100+ stories efficiently:

1. **Organize your images**: Name them systematically (e.g., `story-001.jpg`, `story-002.jpg`)
2. **Create a template**: Use a consistent structure for all stories
3. **Batch process**: Consider using a script to generate MDX files from a CSV or JSON data source

### Example Batch Script Structure

If you have stories in a structured format (CSV, JSON), you can create a Node.js script to generate MDX files:

```javascript
// Example structure for bulk story creation
const stories = [
  {
    id: "002",
    title: "The Dragon's Secret",
    img: "dragon-adventure.jpg",
    content: "Your story content here..."
  },
  // ... more stories
];

// Script would generate MDX files from this data
```

## Tips for Story Images

1. **Consistency**: Use consistent image dimensions for a uniform look
2. **Relevance**: Choose images that represent key moments or themes from your story
3. **Quality**: Use high-quality images that look good on various screen sizes
4. **Naming**: Use descriptive filenames that relate to the story content

## Verifying Your Story

After adding a new story:

1. Restart your development server if it's running
2. Navigate to the Stories page
3. Your new story should appear in the grid
4. Click on it to ensure the content displays correctly
5. Test the zoom controls and dark mode appearance

## Troubleshooting

- **Story not appearing**: Ensure the MDX file is in the correct directory and has valid frontmatter
- **Image not showing**: Verify the image filename in the frontmatter matches the actual file in `story-images/`
- **Formatting issues**: Check that your MDX syntax is valid and paragraphs are properly separated