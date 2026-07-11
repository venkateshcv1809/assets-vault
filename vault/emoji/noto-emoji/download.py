# Copyright (C) 2024 by sanjacob

# Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted.

# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING
# ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL,
# DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
# WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE
# OR PERFORMANCE OF THIS SOFTWARE.


"""
Download all animated emojis from Google Noto Emoji
"""

import requests


def get_emoji_list():
    emojis = []
    r = requests.get('https://googlefonts.github.io/noto-emoji-animation/data/api.json')
    for icon in r.json()['icons']:
        name = icon['tags'][0][1:-1]
        emojis.append((icon['codepoint'], name))
    return emojis


def download_emoji(code, name):
    r = requests.get(f'https://fonts.gstatic.com/s/e/notoemoji/latest/{code}/lottie.json')
    r.raise_for_status()

    with open(f'{name}.json', 'wb') as f:
        f.write(r.content)


def main():
    emojis = get_emoji_list()

    for code, name in emojis:
        print(f'downloading {name} ({code})')

        try:
            download_emoji(code, name)
        except requests.RequestException:
            print(f'could not get emoji {name}')
            pass


if __name__ == '__main__':
    raise SystemExit(main())
