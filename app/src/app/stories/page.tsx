import fs from 'fs';
import path from 'path';
import { getAllStories, StoryData } from '@/lib/stories';
import StoryExplorer from '@/components/StoryExplorer';
import { serialize } from 'next-mdx-remote/serialize';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';

// Cache for words
let smallWords: string[] = [];
let bigWords: string[] = [];

async function getSmallWords(): Promise<string[]> {
  if (smallWords.length > 0) return smallWords;
  try {
    const wordsFilePath = path.join(process.cwd(), 'public/content/small-words.txt');
    const fileContents = fs.readFileSync(wordsFilePath, 'utf8');
    smallWords = fileContents.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    return smallWords;
  } catch (error) {
    console.error("Failed to load small words:", error);
    return [];
  }
}

async function getBigWords(): Promise<string[]> {
  if (bigWords.length > 0) return bigWords;
  try {
    const wordsFilePath = path.join(process.cwd(), 'public/content/big-words.txt');
    const fileContents = fs.readFileSync(wordsFilePath, 'utf8');
    bigWords = fileContents.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    return bigWords;
  } catch (error) {
    console.error("Failed to load big words:", error);
    return [];
  }
}

// Server Action to serialize MDX with appropriate word highlighting
async function serializeMdxAction(rawMdxContent: string): Promise<MDXRemoteSerializeResult | null> {
  'use server';
  
  try {
    const mdxSource = await serialize(rawMdxContent, {
      parseFrontmatter: false,
    });
    return mdxSource;
  } catch (error) {
    console.error("Error serializing MDX content:", error);
    return null;
  }
}

// Helper function to get stories from a specific directory
async function getStoriesFromDir(dir: string): Promise<StoryData[]> {
  // Sanitize dir to prevent path traversal
  if (dir.includes('..') || dir.includes('/')) {
    console.error(`Attempted path traversal with dir: ${dir}`);
    return [];
  }
  try {
    const storiesPath = path.join(process.cwd(), 'public/content/stories', dir);
    if (!fs.existsSync(storiesPath)) {
      return [];
    }
    
    const files = fs.readdirSync(storiesPath);
    const stories: StoryData[] = [];
    
    for (const file of files) {
      // Sanitize file to prevent path traversal
      if (file.includes('..') || file.includes('/')) {
        console.warn(`Skipping potentially malicious file: ${file}`);
        continue;
      }
      if (file.endsWith('.mdx')) {
        const filePath = path.join(storiesPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Parse frontmatter manually (simple approach)
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
          const frontmatterText = frontmatterMatch[1];
          const title = frontmatterText.match(/title:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() || 'Untitled';
          const img = frontmatterText.match(/img:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() || '';
          const wordType = frontmatterText.match(/wordType:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() || dir;
          
          // Remove frontmatter from content
          const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n?/, '');
          
          stories.push({
            id: file.replace('.mdx', ''),
            slug: file.replace('.mdx', ''),
            title,
            img,
            content: contentWithoutFrontmatter,
            wordType
          });
        }
      }
    }
    
    return stories;
  } catch (error) {
    console.error("Failed to load stories from %s:", dir, error);
    return [];
  }
}

export default async function StoriesPage() {
  // Pre-load words
  await getSmallWords();
  await getBigWords();
  
  // Get stories from both directories
  const smallStories = await getStoriesFromDir('small');
  const bigStories = await getStoriesFromDir('big');
  
  // Get all stories for backward compatibility
  const allStories = await getAllStories();
  
  if (!smallStories.length && !bigStories.length && !allStories.length) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Stories</h1>
        <p>No stories found. Add some .mdx files to /content/stories.</p>
      </div>
    );
  }

  return (
    <StoryExplorer 
      smallStories={smallStories}
      bigStories={bigStories}
      allStories={allStories}
      serializeMdxAction={serializeMdxAction} 
    />
  );
}