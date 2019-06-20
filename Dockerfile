FROM node:8.16.0

RUN npm install npm -g

WORKDIR /app
ADD . /app

RUN npm install

CMD ["node", "index.js"]
