import os

# The user-provided text with consonant blends
data = """
# Consonant Blends Word Lists

## R-Blends

### BR Words
brace, Brad, braid, brain, braise, brake, bran, branch, brand, brass, brat, brave, brawl, bray, bread, break, breath, breeze, brew, brick, bride, bridge, bright, brim, bring, brisk, broad, broil, broke, bronco, bronze, brood, brook, broom, broth, brother, brought, brown, browse, bruise, brush

### CR Words
crab, crack, cradle, craft, crane, crash, crawl, crayon, crazy, creek, creep, crib, cricket, cried, croak, crook, crop, cross, crow, crowd, crown, crumb, crunch, crust, cry

### DR Words
drab, draft, drag, dragon, drain, drake, drank, drape, draw, dread, dream, dress, drew, drift, drill, drink, drip, drive, droop, drop, drove, drug, drum, dry

### FR Words
frail, frame, frank, freak, freckles, free, freeze, freight, fresh, Friday, friend, fright, frill, fringe, frizz, frog, from, front, frost, frozen, fruit, fry, frying

### GR Words
grab, grace, grade, graft, grain, gram, grand, grandfather, grandmother, grant, grape, grapes, graph, grasp, grass, grasshopper, grate, grave, gravity, gravy, gray, graze, grease, great, greed, green, greet, grew, grid, grill, grim, grime, grin, grind, grip, grit, groan, groceries, groom, grouch, ground, group, grow, growl, grown, grub, grudge, gruff, grump

### PR Words
practice, praise, prance, pray, prayer, precious, prepare, present, president, press, pretty, pretzel, price, pride, priest, prince, princess, principal, print, prison, prisoner, prize, probably, probe, problem, prod, produce, product, professor, program, project, promise, pronoun, pronounce, proof, prop, propeller, protect, proud, prove, prowl, prune, pry

### TR Words
trace, track, trade, trail, train, tramp, trap, trash, tray, tread, treat, tree, trek, tribe, trick, trim, trip, troll, tromp, troop, trot, trouble, trough, trout, truck, true, truly, trumpet, trunk, trust, truth, try

## S-Blends

### SC Words
scab, scald, scale, scallion, scallop, scalp, scamp, scan, scar, scarce, scare, scarf, scat, scold, scoop, scoot, scooter, scope, scorch, score, scour, scout, scuba, scuff

### SK Words
skate, sketch, ski, skid, skill, skillet, skin, skip, skirt, skit, skull, skunk, sky

### SM Words
smack, small, smart, smash, smear, smell, smile, smock, smog, smoke, smooth, smudge

### SN Words
snack, snag, snail, snake, snap, snare, snarl, snatch, sneak, sneeze, sniff, snip, snob, snoop, snore, snout, snow, snug, snuggle

### SP Words
space, span, spare, spark, spat, speak, spear, speck, speech, speed, spell, spend, spent, spike, spill, spin, spine, spire, spirit, spoil, spoke, sponge, spoon, sport, spot, spout, spur, spy

### ST Words
stable, stack, stadium, staff, stage, stain, stair, stake, stale, stalk, stall, stamp, stand, staple, stapler, star, starch, stare, starfish, start, starve, state, station, stationary, statue, stay, steady, steak, steal, steam, steel, steep, steer, stem, step, stereo, stew, stick, sticky, stiff, still, stilt, sting, stingy, stink, stir, stirrup, stitch, stock, stocking, stomach, stone, stool, stoop, stop, store, storm, story, stove, style

### SW Words
swallow, swam, swamp, swan, swap, swarm, swat, swatch, sway, sweat, sweater, sweep, sweet, sweeten, swell, swept, swerve, swift, swim, swine, swing, swish, switch, swollen, swoop

### SCR Words
scram, scramble, scrap, scrape, scraper, scratch, scrawl, scream, screech, screen, screw, scribble, script, scroll, scrub

### SQU Words
square, squash, squat, squeak, squeal, squeeze, squid, squint, squirm, squirrel, squirt, squish

### STR Words
straight, strain, strainer, strand, strange, stranger, strap, straw, strawberry, stray, streak, stream, street, strength, stretch, stretcher, strict, stride, strike, string, strip, stripe, stroke, stroll, strong, stronger, struck, struggle, strum

### SPR Words
sprain, sprang, sprawl, spray, spread, sprig, spring, springboard, sprinkle, sprinkler, sprint, sprout, spruce

### SPL Words
splash, splendid, splint, splinter, split

## L-Blends

### BL Words
blab, black, blackboard, blade, blame, blank, blanket, blast, blaze, bleach, bleat, bleed, bleep, blend, bless, blew, blind, blink, blip, blizzard, blob, block, blonde, blood, bloom, blossom, blot, blouse, blow, blue, bluff, blunt, blush

### CL Words
clack, clad, claim, clam, clamp, clan, clang, clap, clash, clasp, class, claw, clay, clean, clear, cleat, clerk, click, cliff, climate, climb, cling, clink, clip, cloak, clock, clod, clog, clomp, close, closet, cloth, clothes, clothing, cloud, clove, clown, club, cluck, clue, clump, clutch

### FL Words
flag, flake, flame, flap, flare, flash, flashlight, flat, flaw, flea, fleck, fleet, flesh, flew, flex, flick, flight, fling, flint, flip, float, flock, flood, floor, flop, floss, flour, flow, flower, flu, fluff, fluid, fluke, flunk, flush, flute, fly

### GL Words
glad, glance, glare, glass, gleam, glee, glide, glitch, gloat, glob, globe, gloom, gloss, glove, glow, glue

### PL Words
place, plaid, plain, plan, plane, planet, plank, plant, plate, play, player, plead, pleasant, please, pleat, pledge, plenty, plink, plod, plot, plow, plug, plum, plump

### SL Words
slab, slack, slam, slant, slap, slate, sled, sleek, sleep, sleepy, sleet, sleeve, slept, slice, slick, slid, slide, slight, slim, slime, sling, slip, slipper, slit, slope, slot, slow, slowly, slug, slump, slush, sly

## Final Consonant Blends (T-Blends)

### CT Words
act, duct, exact, fact, insect, object, pact, select, tact, tract

### FT Words
craft, draft, drift, raft, rift, shaft, shift, sift, soft, swift, theft, tuft

### LT Words
dwelt, felt, halt, hilt, jilt, pelt, quilt, salt, silt, stilt, tilt

### NT Words
blunt, chant, front, glint, grunt, hint, hunt, pant, plant, rant, runt, scent, spent, tent

### PT Words
adapt, crept, erupt, kept, opt, sculpt, slept, swept

### ST Words
chest, frost, must, nest, past, rest, stamp, stand, stem, stick, stomp, stop

### XT Words
next, sixty, text

## Additional Initial Blends

### TW Words
twig, twice, twist, twitch

### QU Words
queen, quilt, quick, quack

## Additional Final Consonant Blends

### CK Words
back, chick, dock, duck, lock, rock, sock, truck

### LD Words
bald, build, cold, fold, gold, sold, told, wild

### LF Words
calf, elf, golf, gulf, half, self, shelf, wolf

### LK Words
bulk, chalk, elk, hulk, milk, silk, stalk, walk

### LM Words
balm, calm, elm, film, helm, palm, realm

### LP Words
alp, gulp, help, kelp, pulp, scalp, yelp

### MB Words
bomb, camp, climb, comb, lamb, limb, ramp, thumb

### MP Words
bump, camp, dump, hump, jump, lamp, ramp, stamp

### ND Words
band, bend, hand, kind, pond, sand, round

### NK Words
bank, link, milk, pink, skunk, sink, tank, trunk

### RD Words
award, bird, card, cord, mustard, sword, yard

### RF Words
dwarf, scarf, Smurf, surf, turf, wharf

### RK Words
bark, dark, fork, mark, park, shark, stork

### RL Words
curl, girl, pearl, snarl, swirl, twirl, whirl

### RM Words
alarm, charm, farm, firm, form, germ, storm, worm

### RN Words
acorn, barn, born, burn, corn, horn, thorn, yarn

### RT Words
art, cart, dart, heart, hurt, sport, sort, start

### SK Words
ask, desk, dusk, flask, frisk, mask, task

### SP Words
clasp, crisp, gasp, grasp, lisp, wasp, wisp
"""

output_dir = "app/public/content/consonant-blends"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

lines = data.strip().split('\n')
i = 0
while i < len(lines):
    line = lines[i]
    if line.startswith('###'):
        title = line.strip().replace('### ', '')
        filename_title = title.lower().replace(' ', '-')
        filename = f"{filename_title}.mdx"
        
        # The next line should be the words
        i += 1
        if i < len(lines):
            words_line = lines[i].strip()
            if words_line:
                # Create MDX content
                mdx_content = f"""---
id: "{filename_title}"
title: "{title}"
img: "{filename_title}.jpg"
---

# {title}

{words_line}
"""
                # Write to file
                with open(os.path.join(output_dir, filename), 'w') as f:
                    f.write(mdx_content)
                print(f"Created {filename}")
    i += 1

print("\nDone creating MDX files.") 