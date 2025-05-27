import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the path to the stories directory, now inside public
const storiesDirectory = path.join(process.cwd(), 'public/content/stories');

export interface StoryFrontMatter {
  id: string;
  title: string;
  img: string;
  wordType?: string;
  [key: string]: any; // Allow other properties
}

export interface StoryData extends StoryFrontMatter {
  slug: string;
  content: string; // This will be the raw MDX content
  wordType?: string;
}

export function getAllStorySlugs() {
  try {
    const fileNames = fs.readdirSync(storiesDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error("Error reading story slugs:", error);
    return [];
  }
}

export async function getStoryData(slug: string): Promise<StoryData | null> {
  const fullPath = path.join(storiesDirectory, `${slug}.mdx`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Basic validation for required front-matter fields
    if (!data.id || !data.title || !data.img) {
        console.warn(`Story ${slug} is missing required front-matter fields.`);
        // Depending on strictness, you might want to return null or throw an error
    }

    return {
      slug,
      ...(data as StoryFrontMatter), // Type assertion for front-matter
      content, // Raw MDX content
    };
  } catch (error) {
    console.error(`Error reading story data for ${slug}:`, error);
    // If the file doesn't exist or there's a parsing error, return null
    // or handle as appropriate (e.g., by throwing if the story is expected to exist)
    return null;
  }
}

export async function getAllStories(): Promise<StoryData[]> {
  const slugs = getAllStorySlugs();
  const stories = await Promise.all(
    slugs.map(slug => getStoryData(slug))
  );
  // Filter out any null results (e.g., if a file was unreadable or malformed)
  return stories.filter(story => story !== null) as StoryData[];
} 