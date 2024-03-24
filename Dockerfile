# Build Environment: Node + Playwright
FROM node:20
FROM mcr.microsoft.com/playwright:focal

# Env
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Export port 3000 for Node
EXPOSE 3000

# Copy all app files into Docker Work directory
COPY . /app

# Install Deps
RUN npm install
RUN npx playwright install  

# Run Node index.js file
CMD [ "npm", "start" ]