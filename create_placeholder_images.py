#!/usr/bin/env python3
"""
Create placeholder images for all stories.
Since we can't generate actual images, this creates a list of required images.
"""

stories = [
    # Minecraft stories (001-010)
    ("001", "minecraft-first-day-1.jpg", "My First Day in Minecraft"),
    ("002", "minecraft-building-1.jpg", "Building with Steve"),
    ("003", "minecraft-cave-1.jpg", "The Deep Cave"),
    ("004", "minecraft-farm-1.jpg", "My Animal Farm"),
    ("005", "minecraft-nether-1.jpg", "Into the Nether"),
    ("006", "minecraft-village-1.jpg", "The Village Visit"),
    ("007", "minecraft-ocean-1.jpg", "Ocean Adventure"),
    ("008", "minecraft-redstone-1.jpg", "Redstone Fun"),
    ("009", "minecraft-ender-1.jpg", "The End Portal"),
    ("010", "minecraft-friends-1.jpg", "Playing with Friends"),
    
    # Lego stories (011-020)
    ("011", "lego-city-1.jpg", "My Lego City"),
    ("012", "lego-spaceship-1.jpg", "The Space Mission"),
    ("013", "lego-castle-1.jpg", "Castle Adventure"),
    ("014", "lego-car-1.jpg", "Racing Day"),
    ("015", "lego-robot-1.jpg", "Robot Friend"),
    ("016", "lego-train-1.jpg", "The Train Set"),
    ("017", "lego-zoo-1.jpg", "Lego Zoo"),
    ("018", "lego-airplane-1.jpg", "Flying High"),
    ("019", "lego-house-1.jpg", "Dream House"),
    ("020", "lego-boat-1.jpg", "Sailing Away"),
    
    # Pokemon stories (021-030)
    ("021", "pokemon-pikachu-1.jpg", "Pikachu's Big Day"),
    ("022", "pokemon-starter-1.jpg", "My First Pokemon"),
    ("023", "pokemon-gym-1.jpg", "Gym Battle"),
    ("024", "pokemon-forest-1.jpg", "Forest Friends"),
    ("025", "pokemon-water-1.jpg", "Water Pokemon Fun"),
    ("026", "pokemon-flying-1.jpg", "Sky Adventure"),
    ("027", "pokemon-fire-1.jpg", "Fire Type Friends"),
    ("028", "pokemon-grass-1.jpg", "Grass Pokemon Park"),
    ("029", "pokemon-team-1.jpg", "Team Adventure"),
    ("030", "pokemon-league-1.jpg", "Pokemon League"),
    
    # Mixed stories (031-050)
    ("031", "hiking-trail-1.jpg", "The Mountain Trail"),
    ("032", "drawing-rainbow-1.jpg", "Drawing Rainbows"),
    ("033", "painting-fun-1.jpg", "Painting Day"),
    ("034", "jiu-jitsu-class-1.jpg", "Jiu Jitsu Class"),
    ("035", "karate-belt-1.jpg", "My New Belt"),
    ("036", "video-games-1.jpg", "Game Night"),
    ("037", "chickens-farm-1.jpg", "The Chicken Farm"),
    ("038", "garden-flowers-1.jpg", "My Garden"),
    ("039", "cooking-cookies-1.jpg", "Baking Cookies"),
    ("040", "soccer-goal-1.jpg", "Soccer Practice"),
    ("041", "swimming-pool-1.jpg", "Swimming Lessons"),
    ("042", "camping-tent-1.jpg", "Camping Trip"),
    ("043", "reading-books-1.jpg", "Library Day"),
    ("044", "music-piano-1.jpg", "Piano Lessons"),
    ("045", "dancing-fun-1.jpg", "Dance Class"),
    ("046", "bike-riding-1.jpg", "Learning to Ride"),
    ("047", "pizza-making-1.jpg", "Pizza Night"),
    ("048", "fort-building-1.jpg", "Building a Fort"),
    ("049", "beach-day-1.jpg", "Beach Adventure"),
    ("050", "puppet-show-1.jpg", "The Puppet Show"),
]

print("Required images for all 50 stories:")
print("=" * 50)
print("\nEach story needs 2 images (top and bottom):")
print("\nTOP IMAGES (used as thumbnails):")
for story_id, image_name, title in stories:
    print(f"{story_id}: {image_name} - {title}")

print("\nBOTTOM IMAGES:")
for story_id, image_name, title in stories:
    bottom_image = image_name.replace("-1.jpg", "-2.jpg")
    print(f"{story_id}: {bottom_image} - {title} (bottom)")

print(f"\nTotal images needed: {len(stories) * 2}")
print("\nNote: For now, using existing images as placeholders.")