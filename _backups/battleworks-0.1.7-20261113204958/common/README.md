# Dochi's BattleWorks — 1.20.1 / 1.21.1 workspace

Minecraft 26.3 has moved to `../[26.3] Dochi`s BattleWorkes`. Build and edit 26.3 only in that independent workspace.

Minecraft 1.21.1 / Java 21. The Fabric port is complete. Native NeoForge and Fabric builds share the implementation and resources in `common`; each loader keeps its own entrypoints, networking and mixins. No Architectury runtime is required.

Open `dochi_battleworks.code-workspace` in VS Code. Current Battleworks 0.1.7 JARs for Forge, Fabric and NeoForge are in `jar/`. The previous Fabric 0.1.4 port bundle and its compatible DRM core are in [dist/fabric-1.21.1](dist/fabric-1.21.1/README.md).

Version 0.1.7 adds document Undo/Redo, template search and native previews, ground warnings and arena resets. [사용법](docs/AUTHORING_TOOLS_0.1.7.ko.md) · [DRM 독립 가능성 검토](docs/DRM_INDEPENDENCE_REVIEW_2026-11-07.ko.md).

BattleWorks 0.1.7 now runs without DRM. Use the **BattleWorks Wand** (`dochi_battleworks:editor`) or `/battleworks editor` to open the native selector. DRM retains its shared selector, navigation, configuration and Apply integration when installed. [구현·검증 기록](docs/DRM_INDEPENDENCE_IMPLEMENTATION_2026-11-07.ko.md) · [설계 기록](docs/DRM_INDEPENDENCE_PLAN_2026-11-07.ko.md).

Authoring now includes simple editing for existing patterns, native attack recipes, a personal technique library, and independent resource copies. Test battles, single-attack trials, and observation shortcuts were removed on 2026-11-08. [쉬운 공격 제작](docs/AUTHORING_USABILITY_0.1.7.ko.md) · [최종 JAR 제거 감사](verification/remove-test-battle-recheck-2026-11-08/RESULT.md).

```powershell
.\gradlew.bat --console=plain --no-daemon build
python .\verification\verify_workspace.py
```

The root `gradlew build` builds both loader targets, verifies the workspace and collects the two addon JARs under `build/libs`. Loader-specific dependency fixtures remain under `neoforge/libs` and `fabric/libs`; dependencies are not bundled into the addon.

Fabric requires Fabric API. DRM is optional; DNPC can use its native public API without DRM, and older targets retain their optional CustomNPCs integration; see [NPC version policy](docs/NPC_VERSION_POLICY.md). The previous port bundle retains its own historical dependency notes.

Actual development and production JAR server/client checks cover NPC clone data, resolved damage, guard/cooldown, hitboxes, particles, AI, skills, animation ownership, editor save/load, large transfers and permission rejection. Real Fabric Better Combat/Player Animator/Mob Player Animator playback and preview layer cleanup passed. [Port report](docs/fabric-1.21.1-port.md), [runtime evidence](verification/fabric-runtime/evidence/summary.json), [workspace status](workspace-status.json).

The existing standalone Forge and NeoForge source projects are retained. Continue shared development here. Battleworks is 0.1.7 across Forge, Fabric and NeoForge; DRM keeps its separate version and is an optional integration. IDs, JSON schema and storage paths are retained.
