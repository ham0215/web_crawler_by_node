FROM node:12.9.1

RUN npm install npm -g

WORKDIR /app
ADD . /app

RUN npm install

CMD ["node", "index.js"]
