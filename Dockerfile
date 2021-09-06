FROM mhart/alpine-node:14

WORKDIR /app

COPY package*.json ./

RUN rm .env.local

# shell form
RUN npm install

COPY . .

ENV PORT=6000

# 6000 for express app, 16000 for 
EXPOSE 6000 16000

# exec form - One Dockerfile, One CMD
CMD [ "npm", "run", "start:debug" ]
