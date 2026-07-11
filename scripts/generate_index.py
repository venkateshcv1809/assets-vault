"""
Generate asset index.
"""

from collections import Counter
from pathlib import Path
import json

from config import ASSET_TYPES, RENDERERS
from parser import parse_asset

ROOT = Path(__file__).resolve().parent.parent
VAULT = ROOT / "vault"
DATA = ROOT / "data"


def scan_assets():
    assets = []

    discovered = set()

    for category in VAULT.iterdir():
        if not category.is_dir():
            continue

        discovered.add(category.name)

        for file in category.rglob("*"):
            if not file.is_file() or file.name == ".gitkeep":
                continue

            assets.append(parse_asset(file=file, vault_root=VAULT))

    counts = Counter(asset["category"] for asset in assets)

    categories = []

    for category in sorted(set(ASSET_TYPES) | discovered):
        categories.append(
            {
                "id": category,
                "name": category.title(),
                "supported": category in ASSET_TYPES,
                "count": counts.get(category, 0),
            }
        )

    return sorted(assets, key=lambda a: a["id"]), categories


def generate():
    DATA.mkdir(exist_ok=True)

    assets, categories = scan_assets()

    output = {
        "version": 1,
        "categories": categories,
        "renderers": RENDERERS["renderers"],
        "assets": assets,
    }

    with (DATA / "index.json").open("w", encoding="utf-8") as file:
        json.dump(output, file, indent=4, ensure_ascii=False)

    print(f"Indexed {len(assets)} assets.")


if __name__ == "__main__":
    generate()
