#!/usr/bin/env python3
"""List all stories with their titles and image filenames."""

import os
import re
from pathlib import Path

def extract_story_info():
    stories_dir = Path("/Users/pmbp/Documents/Code/storybook/app/public/content/stories")
    stories = []
    
    for mdx_file in sorted(stories_dir.glob("*.mdx")):
        with open(mdx_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract title and img from frontmatter
        title_match = re.search(r'title:\s*"([^"]+)"', content)
        img_match = re.search(r'img:\s*"([^"]+)"', content)
        
        if title_match and img_match:
            title = title_match.group(1)
            img = img_match.group(1)
            stories.append((title, img))
    
    return stories

if __name__ == "__main__":
    stories = extract_story_info()
    for title, img in stories:
        print(f"{title}: {img}")