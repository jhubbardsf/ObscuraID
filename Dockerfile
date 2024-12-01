# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and bun.lockb for dependencies
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the app's port
EXPOSE 3000

# Start the app using Bun
CMD ["bun", "src/server.ts"]