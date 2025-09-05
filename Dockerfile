# 1. Use Node.js image
FROM node:20.11.1-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json / pnpm-lock.yaml
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy all project files
COPY . .

# 6. Build the project
RUN npm run build

# 7. Install a simple server to serve the build
RUN npm install -g serve

# 8. Expose port 3000
EXPOSE 3000

# 9. Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
