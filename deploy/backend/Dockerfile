# First Stage: Build
FROM node:18-alpine as build

WORKDIR /tmp/app

# Install dependencies
COPY package*.json ./

# TODO: This should use npm ci for production
# RUN npm ci --silent
# RUN npm install --production --silent
RUN npm install --silent

# Copy source
COPY . .

# Build
RUN npm run backend:build

# Second Stage: Production
FROM node:18-alpine

WORKDIR /app

# Set environment variable
ENV NODE_ENV=production

# Copy installed dependencies from build stage
COPY --from=build /tmp/app/node_modules ./node_modules

# Copy built files
COPY --from=build /tmp/app/dist/packages/backend .

# Start server
CMD ["node", "./node_modules/moleculer/bin/moleculer-runner.js"]
