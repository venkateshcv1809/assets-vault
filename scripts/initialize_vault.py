"""
Initialize vault folders.
"""

from pathlib import Path

from config import ASSET_TYPES

ROOT = Path(__file__).resolve().parent.parent
VAULT = ROOT / "vault"


def create_gitkeep(directory: Path) -> None:

    gitkeep = directory / ".gitkeep"

    if not any(directory.iterdir()):
        gitkeep.touch(exist_ok=True)


def initialize() -> None:

    VAULT.mkdir(exist_ok=True)

    for asset_type in ASSET_TYPES:

        directory = VAULT / asset_type

        directory.mkdir(exist_ok=True)

        create_gitkeep(directory)

        print(f"✓ {directory.relative_to(ROOT)}")


if __name__ == "__main__":
    initialize()
