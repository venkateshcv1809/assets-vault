"""
Asset parser.

Converts a vault file into the canonical asset representation used by the
generated index.
"""

from pathlib import Path

from config import renderer_for

PREVIEW_HANDLERS = {
    ".svg": "svg",
    ".json": "lottie",
    ".ttf": "font",
    ".otf": "font",
    ".woff": "font",
    ".woff2": "font",
}


def extract_metadata(file: Path) -> dict:
    """Extract filesystem metadata."""

    stat = file.stat()

    return {
        "size": stat.st_size,
        "modified": int(stat.st_mtime),
    }


def parse_asset(file: Path, vault_root: Path) -> dict:

    relative = file.relative_to(vault_root)

    extension = file.suffix.lower()

    parts = relative.parts

    category = parts[0] if len(parts) > 0 else ""
    source = parts[1] if len(parts) > 1 else ""

    return {
        "id": relative.with_suffix("").as_posix(),
        "name": file.stem,
        "category": category,
        "source": source,
        "path": f"vault/{relative.as_posix()}",
        "extension": extension,
        "renderer": renderer_for(extension),
        "metadata": extract_metadata(file),
    }
