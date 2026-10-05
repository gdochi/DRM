# DW / DWE / Cobblemon docs update — 2026-10-05

Documentation-only update in `[DOCHI] DOCS`. Original content and site configuration are preserved beside this report.

## Source evidence

- Forge DW: `src/main/resources/META-INF/mods.toml` confirms DW 0.3.0 and required TACZ/client Player Animator. `AGENTS.md` and `DW_ADDON_POLICY.md` establish core/addon ownership; current source takes precedence over older policy snapshots.
- DWE: addon `mods.toml`, `README.md`, `gimmick/GimmickDocument.java`, `GimmickCodec.java`, `GimmickStorage.java`, and `runtime/AirSupportCommands.java` confirm dependencies, action types, v6 schema, paths, and commands. Current network source is protocol 16; older README/policy protocol values were deliberately not published as current facts.
- NeoForge DW: `gradle.properties` remains 0.2.9. DWE installation is explicitly scoped to Forge.
- Clone deletion: `reports/clone-library-delete-2026-10-05.md` describes confirmation, recoverable `.deleted` storage, and unchanged spawned entities.
- Cobblemon: both loader `gradle.properties`, `EncounterPresentationSettings.java`, `BattlePresentationData.java`, `BattleSessionCompletion.java`, current preset JSON, and October 4–5 reports establish Fabric 0.2.2 / NeoForge 0.2.1, encounter policies, schema 5, camera/party models, reward stacks, forfeit classification, and list-request fix.
- Mission Core Planner and `/dw planner` were not found in current Forge core, DWE, or NeoForge Java sources. Existing instructions were replaced with a clear limitation and current support-timeline routes.

## Verification performed

- `npm.cmd run build`: passed, 267 documents.
- `verify-docs.mjs`: passed. Korean 39 and English 36 DW/DWE/Cobblemon pages have unique routes, valid sections and internal links; DWE has a populated home entry.
- Five documented preset durations and schema 5 match both Fabric and NeoForge source JSON.
- `git -c core.safecrlf=false diff --check`: passed.
- Preview at `http://localhost:4173`: HTTP 200.
- DW baseline: 531 source/resource/asset/tool/root/JAR files compared by SHA256; zero changes.
- Browser visual verification unavailable: CUA kernel exited because workspace bracket-path filesystem glob configuration only supports deny access. No claim of visual verification or deployment.

Eight new bilingual pages cover DWE setup, reactions, support timelines, and Cobblemon encounter bindings. Existing DW/Cobblemon content and version metadata plus `site.config.json` were updated. Historical 0.1.6 release notes were retained.
