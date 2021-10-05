#!/bin/sh
# echo $@
echo "Minifying bundle.js with Terser..."

terser dist/bundle.js --compress --mangle --output dist/bundle.min.js
