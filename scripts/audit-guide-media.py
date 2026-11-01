"""Inventory candidate captures and document coverage without declaring gameplay verification."""

import hashlib
import argparse
import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / "docs/evidence/illustrated-guides-20261101"


def dump(name, data):
    (EVIDENCE / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--coverage-only", action="store_true", help="Update document coverage without scanning capture files again")
    args = parser.parse_args()
    previous = json.loads((EVIDENCE / "inventory-summary.json").read_text(encoding="utf-8")) if args.coverage_only else {}
    paths = json.loads((EVIDENCE / "candidate-paths.json").read_text(encoding="utf-8-sig"))
    captures = {}
    skipped = Counter()
    for raw in ([] if args.coverage_only else paths):
        source = Path(raw)
        try:
            with Image.open(source) as image:
                width, height = image.size
            if width < 640 or height < 360:
                skipped["small"] += 1
                continue
            if not any(part.lower() in {"screenshots", "verification", "reports", "docs", "qa", "build"} for part in source.parts):
                skipped["no_capture_context"] += 1
                continue
            digest = hashlib.sha256(source.read_bytes()).hexdigest()
            if digest in captures:
                captures[digest]["sources"].append(raw)
                continue
            captures[digest] = {
                "id": digest[:16], "sha256": digest, "width": width, "height": height,
                "bytes": source.stat().st_size, "sources": [raw],
                "fileModifiedUtc": datetime.fromtimestamp(source.stat().st_mtime, timezone.utc).isoformat(),
                "review": "unreviewed", "environment": None,
            }
        except (OSError, ValueError):
            skipped["unreadable"] += 1
    if not args.coverage_only:
        dump("capture-candidates.json", list(captures.values()))

    docs = []
    for source in sorted((ROOT / "content").glob("*/*.md")):
        raw = source.read_text(encoding="utf-8-sig")
        front = raw.split("---", 2)[1] if raw.startswith("---") else ""
        meta = dict(re.findall(r"^([\w-]+):\s*(.+)$", front, re.M))
        if meta.get("hiddenNav") == "true":
            continue
        images = re.findall(r'^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)$', raw, re.M)
        docs.append({
            "file": source.relative_to(ROOT).as_posix(), "locale": source.parent.name,
            "product": meta.get("product", "core"), "slug": meta.get("slug"),
            "title": meta.get("title"), "version": meta.get("version"),
            "headings": re.findall(r"^#{2,4}\s+(.+)$", raw, re.M),
            "images": [{"source": src, "alt": alt, "caption": caption} for alt, src, caption in images],
            "coverage": "has_images_needs_content_review" if images else "needs_images_and_review",
        })
    dump("document-coverage.json", docs)
    summary = {
        "candidateFiles": len(paths), "uniqueLargeImages": previous.get("uniqueLargeImages", len(captures)), "skipped": previous.get("skipped", dict(skipped)),
        "documents": len(docs), "documentsWithImages": sum(bool(doc["images"]) for doc in docs),
        "documentsByProduct": dict(Counter(doc["product"] for doc in docs)),
        "note": "Candidate dimensions and hashes do not establish in-game provenance, version compatibility or successful actions.",
    }
    dump("inventory-summary.json", summary)
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
