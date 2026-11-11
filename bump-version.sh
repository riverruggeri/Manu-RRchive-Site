#!/bin/sh
# Adds a fresh version number to the site's style and script links so
# browsers load the newest files instead of an old saved copy.
# Run before saving changes: sh bump-version.sh
v=$(date +%Y%m%d%H%M%S)
for f in *.html; do
  sed -i -E "s#(href|src)=\"(assets/[a-z]+\.(css|js))(\?v=[0-9]+)?\"#\1=\"\2?v=$v\"#g" "$f"
done
echo "version $v"
