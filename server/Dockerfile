FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT=8081 DOCKER=TRUE

EXPOSE 8081

CMD ["node", "server.js"]