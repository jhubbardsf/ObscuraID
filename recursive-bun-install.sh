#!/bin/bash

# Find all directories containing a package.json file, excluding node_modules
for dir in $(find . -name "package.json" -not -path "*/node_modules/*" -exec dirname {} \;); do
  echo "Installing dependencies in $dir..."
  cd "$dir" || exit 1  # Change to the directory
  bun install          # Run Bun install
  cd - > /dev/null     # Return to the previous directory
done