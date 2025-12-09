---
SECTION_ID: plans.animations.build
TYPE: plan
STATUS: complete
PRIORITY: high
---

# Animation JSON Pack Creation

Goal: Produce the 14 animation spec files defined in PROMPTS.md (knight, witch, rogue, zombie, spectre, cultist, vampire, wraith, corrupted_knight, warden, shadow_lord, void_rift, ancient_one, particles) for the Souls of the Abyss build skeleton.

## Task Breakdown
1. **Review requirements** – Confirm template expectations from PROMPTS.md and repo context. _(done)_
2. **Define per-entity parameters** – Capture frame counts, frame times, loop flags, transitions, sprite sizes. _(done)_
3. **Draft JSON files** – Generate valid JSON for each entity per template. _(done)_
4. **Create animations/ folder files** – Save 14 JSON specs with correct naming and structure. _(done)_
5. **Self-check** – Validate JSON syntax, ensure consistency with sprite sheets and timings. _(done)_
6. **Update build checklist** – Mark Sonic deliverable complete in build plan once files verified. _(pending)_

## Notes
- Characters: include idle/run/attack/hit/death (rogue has dodge). Witch attack named cast per prompt.
- Regular enemies: walk (aka shamble/float), attack, death states only.
- Bosses: idle, attack, phase_change, death; spriteSize 96.
- Particles: slash/explosion/spark/blood/glow with simple animation objects.
- Maintain transition maps exactly per state logic described in prompt; no unused states.
