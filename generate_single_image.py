from PIL import Image, ImageDraw, ImageFont
import os

def generate_custom_image(story_id, title, output_path):
    """
    Generates a custom placeholder image for a single story.
    """
    width, height = 800, 600
    
    # Theme for "Bad Mobs at Night" (Minecraft)
    colors = {
        "bg": (50, 50, 50),  # Dark gray for night
        "accent": (255, 80, 80),  # Red for "bad"
        "text": (255, 255, 255)
    }
    
    img = Image.new('RGB', (width, height), color=colors['bg'])
    draw = ImageDraw.Draw(img)

    # Add some night-time elements (stars)
    for _ in range(100):
        x, y = os.urandom(2)
        x = (x / 255) * width
        y = (y / 255) * height / 2 # Only in the top half
        draw.point((x,y), fill=(200, 200, 200))

    # Add a moon
    draw.ellipse((width - 150, 50, width - 50, 150), fill=(240, 240, 210), outline=(0,0,0))
    
    # Get fonts
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 70)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 30)
    except IOError:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Draw title
    title_bbox = draw.textbbox((0, 0), title, font=font_large)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]
    title_pos = ((width - title_width) / 2, (height - title_height) / 2)
    draw.text(title_pos, title, fill=colors['text'], font=font_large, stroke_width=2, stroke_fill=(0,0,0))
    
    # Draw story ID
    id_text = f"#{story_id}"
    id_bbox = draw.textbbox((0,0), id_text, font=font_small)
    id_pos = (width - id_bbox[2] - 30, height - id_bbox[3] - 30)
    draw.text(id_pos, id_text, fill=colors['text'], font=font_small)

    img.save(output_path, 'JPEG')
    print(f"Created custom image: {output_path}")

if __name__ == '__main__':
    STORY_ID = "007"
    STORY_TITLE = "Bad Mobs at Night"
    OUTPUT_FILE = f"app/public/story-images/{STORY_ID}.jpg"
    
    generate_custom_image(STORY_ID, STORY_TITLE, OUTPUT_FILE) 