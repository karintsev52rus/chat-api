FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

COPY ./dist ./dist

CMD ["npm", "run", "start"]