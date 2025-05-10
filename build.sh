#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Install server dependencies
echo "Installing server dependencies..."
cd server && npm install && cd ..

# Build the React app
echo "Building React app..."
CI=false npm run build

echo "Build completed successfully!"