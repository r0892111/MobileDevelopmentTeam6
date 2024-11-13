# syntax=docker/dockerfile:1.11.1

# Step 1: Build Stage
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json, and tsconfig.json from the project root
COPY ../../package*.json ../../tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema from the project root
COPY ../../prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the entire app directory from the project root
COPY ../../app ./app

# Step 2: Production Stage
FROM node:18 AS production

WORKDIR /app

# Copy node_modules and app from builder stage to production image
COPY --from=builder /app /app

# Install Prisma CLI to run migrations
RUN npm install -g prisma

# Expose the application port
EXPOSE 3010

# Start the application with schema push command
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
