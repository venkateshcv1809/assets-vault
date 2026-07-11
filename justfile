set shell := ["bash", "-cu"]

default:
    @just --list

init:
    python3 scripts/initialize_vault.py

index:
    python3 scripts/generate_index.py

build:
    just init
    just index

serve:
    python3 -m http.server 4001