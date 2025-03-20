FROM node:20 AS build
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
RUN npm i sharp
# Copy the rest of the application code
COPY . .
# Build the app
RUN npm run build
# Expose the port
EXPOSE 3000
# Run the application using npm (development mode)
CMD ["npm", "run", "dev", "--", "--port", "3000"]
