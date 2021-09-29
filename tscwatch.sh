#!/bin/sh
# echo $@
echo "TypeScript, building project using tsconfig.json & watching for changes"

tsc --build --watch
