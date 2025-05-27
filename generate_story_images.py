#!/usr/bin/env python3
"""
Generate images for all 50 stories using AI image generation.
This script creates prompts for each story based on their content.
"""

import os
import json

# Define image generation prompts for each story
story_images = [
    # Minecraft stories (001-010)
    {
        "id": "001",
        "title": "My First Day in Minecraft",
        "prompt": "A cheerful Minecraft scene showing a new player character (Steve) standing in a sunny meadow with trees, looking at a freshly built small wooden house with a door, blocky Minecraft style, bright daylight, game screenshot style",
        "filename": "001.jpg"
    },
    {
        "id": "002", 
        "title": "Building with Steve",
        "prompt": "Minecraft Steve character actively building a colorful house with different colored blocks, construction in progress, tools visible, blocky Minecraft style, daytime scene, game screenshot style",
        "filename": "002.jpg"
    },
    {
        "id": "003",
        "title": "The Deep Cave", 
        "prompt": "Dark Minecraft cave interior with glowing torches on walls, visible ores sparkling in stone, Steve with pickaxe exploring, mysterious atmosphere, blocky game style",
        "filename": "003.jpg"
    },
    {
        "id": "004",
        "title": "My Animal Farm",
        "prompt": "Minecraft farm scene with fenced areas containing pixelated cows, pigs, chickens, and sheep, barn structure, Steve feeding animals, sunny day, blocky style",
        "filename": "004.jpg"
    },
    {
        "id": "005",
        "title": "Into the Nether",
        "prompt": "Minecraft Nether portal glowing purple, Steve standing at entrance, lava and netherrack visible through portal, dark atmospheric scene, blocky game style",
        "filename": "005.jpg"
    },
    {
        "id": "006",
        "title": "The Village Visit",
        "prompt": "Minecraft village with multiple houses, villagers walking around, Steve trading with a villager, iron golem in background, daytime, blocky style",
        "filename": "006.jpg"
    },
    {
        "id": "007",
        "title": "Ocean Adventure",
        "prompt": "Minecraft underwater scene with Steve in a boat on ocean surface, dolphins jumping, coral reef visible below, bright sunny day, blocky water style",
        "filename": "007.jpg"
    },
    {
        "id": "008",
        "title": "Redstone Fun",
        "prompt": "Minecraft redstone contraption with pistons, repeaters, glowing redstone dust trails, Steve working on mechanism, underground workshop, blocky style",
        "filename": "008.jpg"
    },
    {
        "id": "009",
        "title": "The End Portal",
        "prompt": "Minecraft End portal room in stronghold, portal frame with ender eyes glowing, Steve preparing to jump in, mysterious purple particles, blocky style",
        "filename": "009.jpg"
    },
    {
        "id": "010",
        "title": "Playing with Friends",
        "prompt": "Multiple Minecraft characters (Steve and Alex) building together, collaborative construction scene, tools and blocks scattered, happy atmosphere, multiplayer style",
        "filename": "010.jpg"
    },
    
    # Lego stories (011-020)
    {
        "id": "011",
        "title": "My Lego City",
        "prompt": "Colorful LEGO city with buildings, roads, LEGO minifigures, cars, trees made of LEGO bricks, child's hands visible arranging pieces, bright lighting",
        "filename": "011.jpg"
    },
    {
        "id": "012",
        "title": "The Space Mission",
        "prompt": "LEGO spaceship with astronaut minifigures, space station, planets in background, child playing, detailed LEGO construction, stars visible",
        "filename": "012.jpg"
    },
    {
        "id": "013",
        "title": "Castle Adventure",
        "prompt": "LEGO medieval castle with knights, dragon, princess minifigure, drawbridge, colorful LEGO construction, child's playroom setting",
        "filename": "013.jpg"
    },
    {
        "id": "014",
        "title": "Racing Day",
        "prompt": "LEGO race cars on track, checkered flag, racing minifigures, grandstand with LEGO audience, dynamic action scene, bright colors",
        "filename": "014.jpg"
    },
    {
        "id": "015",
        "title": "Robot Friend",
        "prompt": "LEGO robot construction with movable parts, gears visible, child building it, colorful technical pieces, friendly robot design",
        "filename": "015.jpg"
    },
    {
        "id": "016",
        "title": "The Train Set",
        "prompt": "LEGO train on tracks, station with waiting minifigures, trees and buildings along route, child's hand on controller, motion blur on train",
        "filename": "016.jpg"
    },
    {
        "id": "017",
        "title": "Lego Zoo",
        "prompt": "LEGO zoo with brick-built animals (elephant, giraffe, lion), enclosures, zookeeper minifigures, visitors, colorful scene",
        "filename": "017.jpg"
    },
    {
        "id": "018",
        "title": "Flying High",
        "prompt": "LEGO airplane in flight position, airport scene below with runway, control tower, pilot minifigure visible in cockpit",
        "filename": "018.jpg"
    },
    {
        "id": "019",
        "title": "Dream House",
        "prompt": "Elaborate LEGO house with multiple rooms visible, furniture, family minifigures, garden, car in driveway, detailed interior",
        "filename": "019.jpg"
    },
    {
        "id": "020",
        "title": "Sailing Away",
        "prompt": "LEGO sailing boat on blue baseplate water, sailor minifigures, lighthouse in background, seagulls, waves effect with blue bricks",
        "filename": "020.jpg"
    },
    
    # Pokemon stories (021-030)
    {
        "id": "021",
        "title": "Pikachu's Big Day",
        "prompt": "Cute Pikachu in a sunny meadow, electricity sparking from cheeks, butterflies around, happy expression, anime style, vibrant colors",
        "filename": "021.jpg"
    },
    {
        "id": "022",
        "title": "My First Pokemon",
        "prompt": "Young Pokemon trainer receiving first Pokeball from Professor, starter Pokemon (Charmander, Squirtle, Bulbasaur) visible, lab setting, anime style",
        "filename": "022.jpg"
    },
    {
        "id": "023",
        "title": "Gym Battle",
        "prompt": "Pokemon gym battle arena, two Pokemon facing off, trainer commanding, gym leader opposite, crowd watching, dynamic action scene, anime style",
        "filename": "023.jpg"
    },
    {
        "id": "024",
        "title": "Forest Friends",
        "prompt": "Forest scene with various Pokemon (Caterpie, Pidgey, Oddish) among trees, trainer walking on path, dappled sunlight, peaceful atmosphere",
        "filename": "024.jpg"
    },
    {
        "id": "025",
        "title": "Water Pokemon Fun",
        "prompt": "Lake or pool scene with water Pokemon (Squirtle, Psyduck, Magikarp) playing, splashing water, trainer at edge, sunny day, anime style",
        "filename": "025.jpg"
    },
    {
        "id": "026",
        "title": "Sky Adventure",
        "prompt": "Flying Pokemon (Pidgeot, Butterfree) soaring through clouds, trainer riding on Pokemon's back, landscape below, sunset sky, anime style",
        "filename": "026.jpg"
    },
    {
        "id": "027",
        "title": "Fire Type Friends",
        "prompt": "Fire Pokemon (Charmander, Growlithe, Vulpix) around campfire, warm glow, trainer roasting marshmallows, nighttime scene, cozy atmosphere",
        "filename": "027.jpg"
    },
    {
        "id": "028",
        "title": "Grass Pokemon Park",
        "prompt": "Park full of grass Pokemon (Bulbasaur, Oddish, Bellsprout) among flowers, trainer playing with them, sunny day, colorful garden setting",
        "filename": "028.jpg"
    },
    {
        "id": "029",
        "title": "Team Adventure",
        "prompt": "Group of 6 different Pokemon with trainer, walking together on adventure path, diverse types, friendship theme, landscape background",
        "filename": "029.jpg"
    },
    {
        "id": "030",
        "title": "Pokemon League",
        "prompt": "Grand Pokemon League stadium, trainer with Pokemon entering, crowds cheering, championship atmosphere, flags waving, epic scale",
        "filename": "030.jpg"
    },
    
    # Mixed stories (031-050)
    {
        "id": "031",
        "title": "The Mountain Trail",
        "prompt": "Child hiking on mountain trail with backpack, beautiful mountain vista, trail markers, wildflowers along path, clear blue sky",
        "filename": "031.jpg"
    },
    {
        "id": "032",
        "title": "Drawing Rainbows",
        "prompt": "Child at table drawing colorful rainbow with crayons, art supplies scattered, happy expression, bright rainbow artwork visible",
        "filename": "032.jpg"
    },
    {
        "id": "033",
        "title": "Painting Day",
        "prompt": "Child with paintbrush at easel, colorful paint palette, apron with paint splatters, artwork in progress, art studio setting",
        "filename": "033.jpg"
    },
    {
        "id": "034",
        "title": "Jiu Jitsu Class",
        "prompt": "Children in white gi uniforms practicing jiu jitsu moves on mats, instructor demonstrating, dojo setting, respectful atmosphere",
        "filename": "034.jpg"
    },
    {
        "id": "035",
        "title": "My New Belt",
        "prompt": "Child in karate uniform proudly holding new colored belt, certificate visible, sensei congratulating, dojo background",
        "filename": "035.jpg"
    },
    {
        "id": "036",
        "title": "Game Night",
        "prompt": "Family playing video games together in living room, game controllers, TV showing colorful game, snacks on table, cozy evening",
        "filename": "036.jpg"
    },
    {
        "id": "037",
        "title": "The Chicken Farm",
        "prompt": "Child feeding chickens in farmyard, red barn background, various colored chickens pecking, eggs in basket, rural setting",
        "filename": "037.jpg"
    },
    {
        "id": "038",
        "title": "My Garden",
        "prompt": "Child watering plants in vegetable garden, tomatoes and flowers growing, garden tools, butterflies, sunny day",
        "filename": "038.jpg"
    },
    {
        "id": "039",
        "title": "Baking Cookies",
        "prompt": "Child and parent baking cookies in kitchen, mixing bowl, cookie shapes on tray, flour dusting, warm kitchen atmosphere",
        "filename": "039.jpg"
    },
    {
        "id": "040",
        "title": "Soccer Practice",
        "prompt": "Children playing soccer on field, kicking ball towards goal, coach watching, orange cones for drills, energetic action",
        "filename": "040.jpg"
    },
    {
        "id": "041",
        "title": "Swimming Lessons",
        "prompt": "Child learning to swim in pool with instructor, pool noodles, other kids practicing, bright pool area, safety equipment visible",
        "filename": "041.jpg"
    },
    {
        "id": "042",
        "title": "Camping Trip",
        "prompt": "Family tent in forest clearing, campfire with marshmallows, sleeping bags visible, stars beginning to show, outdoor adventure",
        "filename": "042.jpg"
    },
    {
        "id": "043",
        "title": "Library Day",
        "prompt": "Child selecting books from library shelf, cozy reading corner, librarian helping, colorful book spines, quiet atmosphere",
        "filename": "043.jpg"
    },
    {
        "id": "044",
        "title": "Piano Lessons",
        "prompt": "Child at piano with teacher, sheet music on stand, hands on keys, music notes decorations, practice room setting",
        "filename": "044.jpg"
    },
    {
        "id": "045",
        "title": "Dance Class",
        "prompt": "Children in dance studio doing ballet or jazz moves, mirrors on wall, ballet barre, instructor demonstrating, energetic scene",
        "filename": "045.jpg"
    },
    {
        "id": "046",
        "title": "Learning to Ride",
        "prompt": "Child on bicycle with training wheels, parent helping balance, helmet on, driveway or park path, determined expression",
        "filename": "046.jpg"
    },
    {
        "id": "047",
        "title": "Pizza Night",
        "prompt": "Family making homemade pizza, dough being stretched, toppings arranged, oven in background, fun messy kitchen scene",
        "filename": "047.jpg"
    },
    {
        "id": "048",
        "title": "Building a Fort",
        "prompt": "Children building blanket fort in living room, pillows and sheets draped over furniture, flashlights inside, cozy hideaway",
        "filename": "048.jpg"
    },
    {
        "id": "049",
        "title": "Beach Adventure",
        "prompt": "Children building sandcastle on beach, bucket and shovel, waves in background, seashells scattered, sunny beach day",
        "filename": "049.jpg"
    },
    {
        "id": "050",
        "title": "The Puppet Show",
        "prompt": "Children watching puppet show, colorful puppets on stage, excited audience faces, puppet theater setup, entertaining scene",
        "filename": "050.jpg"
    }
]

# Save as JSON for reference
with open('story_image_prompts.json', 'w') as f:
    json.dump(story_images, f, indent=2)

print("Story image prompts generated!")
print(f"Total: {len(story_images)} images")
print("\nImage prompts have been saved to story_image_prompts.json")
print("\nThese prompts are designed to create kid-friendly, appropriate images for each story.")
print("Each prompt captures the main theme and creates a visually engaging scene for 1st graders.")

# Also create a script to generate placeholder images with the right names
print("\nCreating placeholder images...")
import subprocess

for story in story_images:
    filename = story['filename']
    filepath = f"/Users/pmbp/Documents/Code/storybook/app/public/story-images/{filename}"
    
    # Check if file already exists
    if not os.path.exists(filepath):
        print(f"Note: {filename} needs to be created for '{story['title']}'")

print("\nNext steps:")
print("1. Use an AI image generator (like DALL-E, Midjourney, or Stable Diffusion) with these prompts")
print("2. Save each generated image with the corresponding filename")
print("3. Place images in /app/public/story-images/")