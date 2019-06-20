FROM node:8.16.0

WORKDIR /app
ADD . /app

CMD ["node", "index.js"]
