FROM node:12-alpine

# Create app directory
WORKDIR /opt

# Copy app source code
COPY . .

# Install app dependencies
RUN npm install

# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
