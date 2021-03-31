FROM mhart/alpine-node:14

WORKDIR /app

COPY package*.json ./

# shell form
RUN npm install

COPY . .

ENV PORT=6000

EXPOSE 6000

# exec form - One Dockerfile, One CMD
CMD [ "node", "index.js" ]
