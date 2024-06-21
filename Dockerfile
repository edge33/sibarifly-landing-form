# Stage 1: Build the React app using Vite
FROM node:20-slim AS build

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the React app using Vite
ARG VITE_API_URL
RUN pnpm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration file
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
