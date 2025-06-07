from PIL import Image, ImageDraw, ImageFont
import os

# List of blend file names (derived from the MDX script)
blend_filenames = [
    "br-words", "cr-words", "dr-words", "fr-words", "gr-words", "pr-words", "tr-words",
    "sc-words", "sk-words", "sm-words", "sn-words", "sp-words", "st-words", "sw-words",
    "scr-words", "squ-words", "str-words", "spr-words", "spl-words",
    "bl-words", "cl-words", "fl-words", "gl-words", "pl-words", "sl-words",
    "ct-words", "ft-words", "lt-words", "nt-words", "pt-words", "xt-words",
    "tw-words", "qu-words", "ck-words", "ld-words", "lf-words", "lk-words",
    "lm-words", "lp-words", "mb-words", "mp-words", "nd-words", "nk-words",
    "rd-words", "rf-words", "rk-words", "rl-words", "rm-words", "rn-words",
    "rt-words"
]

# Define color themes
color_themes = {
    "r-blends": {"bg": (255, 102, 102), "text": (255, 255, 255)},
    "s-blends": {"bg": (102, 178, 255), "text": (255, 255, 255)},
    "l-blends": {"bg": (102, 255, 178), "text": (0, 0, 0)},
    "final-blends": {"bg": (255, 178, 102), "text": (0, 0, 0)},
    "other": {"bg": (204, 153, 255), "text": (255, 255, 255)},
}

def get_theme(filename):
    if any(c in filename for c in ['br','cr','dr','fr','gr','pr','tr']):
        return "r-blends"
    if any(c in filename for c in ['sc','sk','sm','sn','sp','st','sw','scr','squ','str','spr','spl']):
        return "s-blends"
    if any(c in filename for c in ['bl','cl','fl','gl','pl','sl']):
        return "l-blends"
    if any(c in filename for c in ['ct','ft','lt','nt','pt','xt','ck','ld','lf','lk','lm','lp','mb','mp','nd','nk','rd','rf','rk','rl','rm','rn','rt']):
        return "final-blends"
    return "other"


output_dir = "app/public/story-images"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for name in blend_filenames:
    image_filename = f"{name}.jpg"
    filepath = os.path.join(output_dir, image_filename)

    width, height = 800, 600
    theme_name = get_theme(name)
    colors = color_themes[theme_name]
    
    img = Image.new('RGB', (width, height), color=colors['bg'])
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 200)
    except IOError:
        font = ImageFont.load_default()

    draw = ImageDraw.Draw(img)
    
    text = name.split('-')[0].upper()
    
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    position = ((width - text_width) / 2, (height - text_height) / 2)
    
    draw.text(position, text, fill=colors['text'], font=font)
    
    img.save(filepath, 'JPEG')
    print(f"Created {image_filename}")

print("\\nDone creating blend images.") 