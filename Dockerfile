FROM mhart/alpine-node:14

WORKDIR /app

COPY package*.json ./

# shell form
RUN npm install

COPY . .

ENV PORT=6100

# 6100 for express app, 16100 for 
EXPOSE 6100 16100

# exec form - One Dockerfile, One CMD
CMD [ "npm", "run", "start:debug" ]
