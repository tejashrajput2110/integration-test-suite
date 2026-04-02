# Use Node.js image
FROM node:22

# Create app directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Start app
CMD ["npm", "start"]