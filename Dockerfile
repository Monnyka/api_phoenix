FROM arm32v7/node:alpine
WORKDIR /app
COPY package*.json server.js ./
RUN npm install
EXPOSE 3000
CMD ["npm","start"]