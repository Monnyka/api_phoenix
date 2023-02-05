FROM arm32v7/node
WORKDIR /app
COPY package*.json server.js ./
RUN npm install
EXPOSE 3000
CMD ["npm","start"]