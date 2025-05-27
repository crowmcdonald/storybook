import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { writeFile } from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const image = formData.get('image') as File;

    console.log('Received form data:', { title, content, imageSize: image?.size });

    if (!title || !content || !image) {
      return NextResponse.json(
        { error: 'Missing required fields', details: { hasTitle: !!title, hasContent: !!content, hasImage: !!image } },
        { status: 400 }
      );
    }

    // Get the next available story ID
    const storiesDir = path.join(process.cwd(), 'public/content/stories');
    const files = await fs.readdir(storiesDir);
    const storyNumbers = files
      .filter(f => f.endsWith('.mdx'))
      .map(f => parseInt(f.replace('.mdx', '')))
      .filter(n => !isNaN(n));
    
    const nextId = storyNumbers.length > 0 ? Math.max(...storyNumbers) + 1 : 1;
    const storyId = String(nextId).padStart(3, '0');

    // Save the image
    const imageBytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);
    const imageExtension = image.name.split('.').pop() || 'jpg';
    const imageName = `${storyId}.${imageExtension}`;
    const imagePath = path.join(process.cwd(), 'public/story-images', imageName);
    
    await writeFile(imagePath, imageBuffer);

    // Create the MDX content
    const mdxContent = `---
id: "${storyId}"
title: "${title}"
img: "${imageName}"
---

# ${title}

${content}`;

    // Save the MDX file
    const mdxPath = path.join(storiesDir, `${storyId}.mdx`);
    await writeFile(mdxPath, mdxContent, 'utf-8');

    return NextResponse.json({
      success: true,
      storyId,
      message: 'Story uploaded successfully'
    });

  } catch (error) {
    console.error('Error uploading story:', error);
    return NextResponse.json(
      { error: 'Failed to upload story' },
      { status: 500 }
    );
  }
}