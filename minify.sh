#!/bin/sh
# echo $@
echo "Minifying xxxxx.js with Terser..."

terser dist/xxxxx.js --compress --mangle --output dist/xxxxx.min.js
