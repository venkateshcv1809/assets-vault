"""
Configuration loader.
"""

from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "config"


def load_yaml(filename: str) -> dict:
    with (CONFIG / filename).open("r", encoding="utf-8") as file:
        return yaml.safe_load(file)


ASSET_TYPES = load_yaml("asset_types.yaml")["asset_types"]
file_types_config = load_yaml("file_types.yaml")

FILE_TYPES = file_types_config["file_types"]
DEFAULT_FILE_TYPE = file_types_config["default"]
RENDERERS = load_yaml("renderers.yaml")


def renderer_for(extension: str) -> str:
    return FILE_TYPES.get(
        extension,
        DEFAULT_FILE_TYPE,
    )["renderer"]


def validate():
    if DEFAULT_FILE_TYPE is None:
        raise RuntimeError("Missing default renderer")

    if "renderers" not in RENDERERS:
        raise RuntimeError("renderers.yaml must contain a 'renderers' section")


def supported_extensions():
    return {ext for ext in FILE_TYPES if ext != "default"}


validate()
