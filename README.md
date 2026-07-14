# Assets Vault

Assets Vault is a static asset browser for organizing, indexing, and previewing reusable design resources such as icons, emoji, fonts, logos, illustrations, and templates.

Assets are stored in a structured vault and automatically indexed into a searchable catalog. The generated website is completely static and can be hosted on GitHub Pages or any static web server.

## Features

- Static website built with HTML, CSS, and JavaScript
- Automatic asset indexing using Python
- Search across the entire asset catalog
- Category navigation
- Asset preview
- Pagination
- Responsive layout
- Local-first workflow
- GitHub Pages compatible

## Goals

- Organize reusable design assets in a single location
- Keep assets separate from generated metadata
- Make browsing fast and simple
- Avoid unnecessary frameworks and build tools
- Generate everything from the asset vault
- Keep deployment as simple as copying static files

## Quick Start

Clone the repository.

```bash
git clone <repository-url>
cd assets-vault
```

Create a virtual environment and install Python dependencies.

```bash
python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt
```

Generate the asset catalog.

```bash
python scripts/generate_index.py
```

Start a local web server.

```bash
python -m http.server 8000
```

Open:

```
http://localhost:8000
```

## Project Structure

```text
assets-vault/
├── assets/
│   ├── css/
│   ├── js/
│   ├── fonts/
│   └── favicon/
├── config/
│   ├── asset_types.yaml
│   ├── file_types.yaml
│   └── renderers.yaml
├── data/
│   └── index.json
├── scripts/
│   ├── generate_index.py
│   ├── initialize_vault.py
│   ├── parser.py
│   └── config.py
├── vault/
│   ├── emoji/
│   ├── icons/
│   ├── fonts/
│   ├── logos/
│   └── templates/
├── index.html
├── requirements.txt
├── justfile
└── README.md
```

## How it Works

1. Store assets inside the `vault/` directory.
2. Run the indexing script.
3. The script generates `data/index.json`.
4. The website loads the generated catalog.
5. Assets can then be searched, browsed, and previewed.

The generated `data/` directory should not be edited manually.

## License

The source code is licensed under the MIT License.

Assets stored inside the vault remain the property of their respective authors and are distributed under their own licenses.