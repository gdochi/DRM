# MWENT documentation evidence — 2026-10-30

The public baseline is the actual CurseForge upload, not a historical development document's `0.1.0` label or today's source tree. `card-history.json` records the upload IDs, timestamps, original JAR hashes and normalized catalog hashes. Upload metadata was read from the public CFWidget index for CurseForge project 1739148; the JARs were obtained from CurseForge's public ForgeCDN files using those IDs and filenames.

## Compared artifacts

- 0.1.1: Fabric 1.21.1 file 9299087, uploaded 2026-10-23.
- 0.1.2: Fabric 1.21.1 file 9309263, uploaded 2026-10-24. 26.3 files 9317314 / 9317311 were added on 2026-10-25.
- 0.1.3: Fabric 1.21.1 file 9322373, uploaded 2026-10-25.
- 0.1.4: Fabric 1.21.1 file 9349914, uploaded 2026-10-28.
- 0.1.5: current independent `[26.3] Dochi`s MiniGames` workspace and its collected production JARs. This is not classified as a public upload by this documentation task.

The first four uploaded catalogs are identical: 263 built-in and 89 optional definitions. No addition, deletion or definition change occurs between them. The current catalog has 335 built-in and 89 optional definitions: 60 additions at IDs 1700–1759 and twelve at 1800–1811. Existing numeric, rarity, frame, legacy ability, keyword and appearance definitions are preserved; the new default `authored` structure is not counted as a rebalance.

`catalog-0.1.1.json` and `catalog-0.1.5.json` retain the actual definitions. Repeated identical historical snapshots are represented by their hashes rather than duplicated files. Counts exclude duplicate animated prints and unassigned custom-card slots. Five model-library definitions are part of the built-in catalog; not every built-in definition is playable with vanilla assets alone.

## Reproduce extraction

`ExportMwent.java` reads the compiled common card model and its bundled JSON using Java 25 and Gson on the classpath. It does not invoke Minecraft or the mod entrypoint. Pass a selected production JAR and a Gson JAR as the classpath, then the Java source file and an output JSON path. Run it separately for every historical artifact. Never substitute today's compiled classes when extracting an older JAR.

Compare `MobCards.ALL` and each optional preset's `cards`, keyed by built-in card ID or optional preset plus stable list index. The exporter also reads bundled translations for documentation labels; translations are omitted from the preserved definition snapshots and definition hashes. Optional prototype numeric IDs may be remapped in a session, so public tables use stable item keys.

## Gameplay source checks

Current gameplay and authoring were checked in local owned inputs, including `MobBattleRules`, `MobBattleActions`, `MobBattleEffects`, `MobFactions`, `MobCards`, `MobPlayerDeck`, `MwentPlayerDecks`, `MwentTableServer`, `MinigameItems`, `MobCardLibrary`, `MobAuthoredCard`, `MobAdvancedRules`, `MobAdvancedOperations` and `MobCardChoices`.

The 0.1.2 UI/server summary is supported by the retained local `MWENT_UI_REPAIR_2026-10-24.md` and `MWENT_OPTIMIZATION_2026-10-24.md` implementation records. It is not presented as a verbatim CurseForge changelog. Exact public release pages were linked, while their HTML was unavailable behind a security check. No security challenge was solved. Actual uploaded artifact data supplies the card comparison.

Identical card definitions do not prove identical combat engines or all-loader gameplay. The documentation task does not rerun Minecraft tests. Site build, route, locale, card-row and rendering verification are separate from existing mod runtime evidence.

## Document ownership

Dedicated MWENT pages live in `content/ko/150-*.md` through `160-*.md` and their English counterparts, product `mwent`. Existing `minigames-mwent` and `minigames-acquisition` routes remain as short navigation pages. The homepage entry shares Minigames' download and logo; MWENT remains included in that mod. No external publication is performed by the documentation edit.
