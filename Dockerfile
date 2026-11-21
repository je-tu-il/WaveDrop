FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 8099
CMD ["node", "server.js"]
