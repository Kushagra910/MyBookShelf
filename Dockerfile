FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Install 'serve' to serve the build directory
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
