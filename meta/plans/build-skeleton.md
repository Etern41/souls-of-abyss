---
SECTION_ID: plans.build.skeleton_generation
TYPE: plan
STATUS: in_progress
PRIORITY: high
---

# Initial Playable Build Generation

GOAL: Produce Souls of the Abyss playable skeleton (game.js, index.html, sprites/, animations/) per PROMPTS.md so QA can run tests.
TIMELINE: Today

## Task Checklist

### Phase 1: Code Generation
- [x] Review PROMPTS.md requirements for Cody outputs
- [x] Delegate PROMPT #1 to Cody → save game.js (completed, file in repo)
- [x] Delegate PROMPT #2 to Cody → save index.html

### Phase 2: Asset Generation
- [x] Delegate PROMPT #3 to Dali → populate sprites/
- [x] Delegate PROMPT #4 to Sonic → populate animations/

### Phase 3: Integration & Verification
- [x] Verify file structure + counts match README checklist (Cody verified names/counts; pending content QA)
- [ ] Execute smoke test and report findings (Jace)
  1. Open index.html in browser, confirm canvas/HUD/buttons per PROMPTS checklist.
  2. Inspect hidden sprite tags + network panel for loading status; watch console for errors/warnings.
  3. Playtest each hero for ~1 minute: movement, auto-weapons, wave spawn, soul drops, HUD essence updates.
  4. Capture FPS/console/memory snapshots and flag blockers/placeholders.
- [*] Trigger Jace for initial smoke test once files exist

## Success Criteria
- [ ] game.js and index.html exist with Cody-spec code (no TODOs)
- [ ] sprites/ has required 15 PNGs, animations/ has 14 JSONs
- [ ] Basic browser load succeeds; handoff to QA ready
