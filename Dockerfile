FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

RUN apk add --no-cache netcat-openbsd && yarn global add sequelize-cli

RUN chmod +x docker-entrypoint.sh

CMD ["/app/docker-entrypoint.sh"]
