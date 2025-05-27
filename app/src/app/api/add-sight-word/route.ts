import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { word, category } = await request.json();
    
    if (!word || typeof word !== 'string') {
      return NextResponse.json(
        { error: 'Invalid word provided' },
        { status: 400 }
      );
    }
    
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord) {
      return NextResponse.json(
        { error: 'Word cannot be empty' },
        { status: 400 }
      );
    }
    
    // Handle different categories
    if (category === 'small') {
      // Add to small words
      const wordsPath = path.join(process.cwd(), 'public/content/small-words.txt');
      const currentContent = await fs.readFile(wordsPath, 'utf-8');
      const currentWords = currentContent
        .split('\n')
        .map(w => w.trim())
        .filter(w => w.length > 0);
      
      // Check if word already exists
      if (currentWords.includes(trimmedWord)) {
        return NextResponse.json(
          { error: 'Word already exists in small words' },
          { status: 409 }
        );
      }
      
      // Add new word and sort alphabetically
      const updatedWords = [...currentWords, trimmedWord].sort((a, b) => 
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
      
      // Write back to file
      const newContent = updatedWords.join('\n');
      await fs.writeFile(wordsPath, newContent, 'utf-8');
      
    } else if (category === 'big') {
      // Add to big words
      const bigPath = path.join(process.cwd(), 'public/content/big-words.txt');
      const currentContent = await fs.readFile(bigPath, 'utf-8');
      const currentWords = currentContent
        .split('\n')
        .map(w => w.trim())
        .filter(w => w.length > 0);
      
      // Check if word already exists
      if (currentWords.includes(trimmedWord)) {
        return NextResponse.json(
          { error: 'Word already exists in big words' },
          { status: 409 }
        );
      }
      
      // Add new word and sort alphabetically
      const updatedWords = [...currentWords, trimmedWord].sort((a, b) => 
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
      
      // Write back to file
      const newContent = updatedWords.join('\n');
      await fs.writeFile(bigPath, newContent, 'utf-8');
      
    } else {
      // Add to all words (backward compatibility)
      const wordsPath = path.join(process.cwd(), 'public/content/words.txt');
      const currentContent = await fs.readFile(wordsPath, 'utf-8');
      const currentWords = currentContent
        .split('\n')
        .map(w => w.trim())
        .filter(w => w.length > 0);
      
      // Check if word already exists
      if (currentWords.includes(trimmedWord)) {
        return NextResponse.json(
          { error: 'Word already exists in the database' },
          { status: 409 }
        );
      }
      
      // Add new word and sort alphabetically
      const updatedWords = [...currentWords, trimmedWord].sort((a, b) => 
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
      
      // Write back to file
      const newContent = updatedWords.join('\n');
      await fs.writeFile(wordsPath, newContent, 'utf-8');
    }
    
    return NextResponse.json({
      success: true,
      word: trimmedWord,
      category: category || 'all'
    });
    
  } catch (error) {
    console.error('Error adding sight word:', error);
    return NextResponse.json(
      { error: 'Failed to add word to database' },
      { status: 500 }
    );
  }
}