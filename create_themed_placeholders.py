#!/usr/bin/env python3
"""
Create themed placeholder images for stories using PIL.
These will have appropriate colors and text for each story theme.
"""

from PIL import Image, ImageDraw, ImageFont
import os
import json

# Load story data
with open('story_image_prompts.json', 'r') as f:
    stories = json.load(f)

# Define color themes for different story types
color_themes = {
    "minecraft": {
        "bg": (76, 175, 80),  # Minecraft green
        "accent": (139, 69, 19),  # Brown
        "text": (255, 255, 255)
    },
    "lego": {
        "bg": (255, 193, 7),  # LEGO yellow
        "accent": (244, 67, 54),  # LEGO red
        "text": (255, 255, 255)
    },
    "pokemon": {
        "bg": (33, 150, 243),  # Pokemon blue
        "accent": (255, 235, 59),  # Pokemon yellow
        "text": (255, 255, 255)
    },
    "outdoor": {
        "bg": (139, 195, 74),  # Nature green
        "accent": (255, 193, 7),  # Sun yellow
        "text": (255, 255, 255)
    },
    "creative": {
        "bg": (156, 39, 176),  # Creative purple
        "accent": (255, 152, 0),  # Orange
        "text": (255, 255, 255)
    },
    "sports": {
        "bg": (255, 87, 34),  # Sports orange
        "accent": (33, 150, 243),  # Blue
        "text": (255, 255, 255)
    },
    "learning": {
        "bg": (96, 125, 139),  # Learning blue-grey
        "accent": (255, 193, 7),  # Yellow
        "text": (255, 255, 255)
    }
}

# Map stories to themes
def get_theme(story_id):
    id_num = int(story_id)
    if 1 <= id_num <= 10:
        return "minecraft"
    elif 11 <= id_num <= 20:
        return "lego"
    elif 21 <= id_num <= 30:
        return "pokemon"
    elif id_num in [31, 37, 38, 42, 49]:  # Outdoor activities
        return "outdoor"
    elif id_num in [32, 33, 44, 45, 48, 50]:  # Creative activities
        return "creative"
    elif id_num in [34, 35, 36, 40, 41, 46]:  # Sports/physical
        return "sports"
    else:  # Learning activities
        return "learning"

# Create placeholder images
output_dir = "/Users/pmbp/Documents/Code/storybook/app/public/story-images"

for story in stories:
    filename = os.path.join(output_dir, story['filename'])
    
    # Skip if file already exists (001-006.jpg)
    if os.path.exists(filename) and int(story['id']) <= 6:
        print(f"Skipping {filename} - already exists")
        continue
    
    # Create image
    width, height = 800, 600
    theme = get_theme(story['id'])
    colors = color_themes[theme]
    
    # Create base image with gradient effect
    img = Image.new('RGB', (width, height), colors['bg'])
    draw = ImageDraw.Draw(img)
    
    # Add gradient effect
    for i in range(height):
        alpha = i / height
        color = tuple(int(c * (1 - alpha * 0.3)) for c in colors['bg'])
        draw.rectangle([(0, i), (width, i+1)], fill=color)
    
    # Add decorative elements based on theme
    if theme == "minecraft":
        # Draw pixelated blocks
        block_size = 40
        for x in range(0, width, block_size * 3):
            for y in range(0, height, block_size * 3):
                if (x + y) % (block_size * 6) == 0:
                    draw.rectangle([(x, y), (x + block_size, y + block_size)], 
                                 fill=colors['accent'], outline=(0, 0, 0), width=2)
    
    elif theme == "lego":
        # Draw LEGO studs pattern
        for x in range(50, width - 50, 60):
            for y in range(50, height - 50, 60):
                if (x + y) % 120 == 0:
                    draw.ellipse([(x, y), (x + 30, y + 30)], 
                               fill=colors['accent'], outline=(0, 0, 0), width=2)
    
    elif theme == "pokemon":
        # Draw pokeball pattern
        ball_x, ball_y = width - 120, 50
        draw.ellipse([(ball_x, ball_y), (ball_x + 80, ball_y + 80)], 
                   fill=colors['accent'], outline=(0, 0, 0), width=3)
        draw.rectangle([(ball_x, ball_y + 38), (ball_x + 80, ball_y + 42)], 
                     fill=(0, 0, 0))
        draw.ellipse([(ball_x + 30, ball_y + 30), (ball_x + 50, ball_y + 50)], 
                   fill=(255, 255, 255), outline=(0, 0, 0), width=2)
    
    # Add story number in corner
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 80)
        font_medium = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 30)
    except:
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Draw story number
    draw.text((30, 30), f"#{story['id']}", fill=colors['text'], font=font_large, 
              stroke_width=3, stroke_fill=(0, 0, 0))
    
    # Draw title (word wrap if needed)
    title = story['title']
    words = title.split()
    lines = []
    current_line = []
    
    for word in words:
        current_line.append(word)
        test_line = ' '.join(current_line)
        bbox = draw.textbbox((0, 0), test_line, font=font_medium)
        if bbox[2] > width - 100:
            current_line.pop()
            lines.append(' '.join(current_line))
            current_line = [word]
    lines.append(' '.join(current_line))
    
    # Draw title lines
    y_offset = height // 2 - (len(lines) * 50) // 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font_medium)
        text_width = bbox[2] - bbox[0]
        x = (width - text_width) // 2
        draw.text((x, y_offset), line, fill=colors['text'], font=font_medium,
                 stroke_width=2, stroke_fill=(0, 0, 0))
        y_offset += 50
    
    # Add theme label
    theme_label = theme.upper().replace("_", " ")
    bbox = draw.textbbox((0, 0), theme_label, font=font_small)
    text_width = bbox[2] - bbox[0]
    draw.text(((width - text_width) // 2, height - 80), theme_label, 
              fill=colors['text'], font=font_small,
              stroke_width=2, stroke_fill=(0, 0, 0))
    
    # Save image
    img.save(filename, 'JPEG', quality=95)
    print(f"Created {filename}")

print("\nAll placeholder images created!")
print("These themed placeholders will work until you can generate proper AI images.")
print("\nTo generate actual images:")
print("1. Use the prompts in story_image_prompts.json")
print("2. Use DALL-E 3, Midjourney, or Stable Diffusion")
print("3. Save with the same filenames to replace these placeholders")