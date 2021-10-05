#!/bin/sh
# echo $@
echo "Bundling mtg.js with Deno..."

deno bundle dist/mtg.js dist/bundle.js
