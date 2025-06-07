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
  try {
    const storiesPath = path.join(process.cwd(), 'public/content/', dir);
    if (!fs.existsSync(storiesPath)) {
      return [];
    }
    
    const files = fs.readdirSync(storiesPath);
    const stories: StoryData[] = [];
    
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const filePath = path.join(storiesPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Parse frontmatter manually (simple approach)
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
          const frontmatterText = frontmatterMatch[1];
          const title = frontmatterText.match(/title:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() || 'Untitled';
          const img = frontmatterText.match(/img:\s*"([^"]+)"/)?.[1] || '';
          const wordType = frontmatterText.match(/wordType:\s*"([^"]+)"/)?.[1] || dir;
          
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
    console.error(`Failed to load stories from ${dir}:`, error);
    return [];
  }
}

export default async function StoriesPage() {
  // Pre-load words
  await getSmallWords();
  await getBigWords();
  
  // Get all consonant blends stories
  const blendStories = await getStoriesFromDir('consonant-blends');
  
  if (!blendStories.length) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Consonant Blends</h1>
        <p>No consonant blends found. Add some .mdx files to /public/content/consonant-blends.</p>
      </div>
    );
  }

  return (
    <StoryExplorer 
      smallStories={[]}
      bigStories={[]}
      allStories={blendStories}
      serializeMdxAction={serializeMdxAction} 
    />
  );
}