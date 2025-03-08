FROM node:16-alpine

WORKDIR /workspace

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
