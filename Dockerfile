# Stage 1: Build the Vite application
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the custom nginx configuration
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built Vite assets
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 as recommended by Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
