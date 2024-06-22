# Dockerfile for development environment

FROM node:20.5.1

WORKDIR /usr/src/api

COPY . .

COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

EXPOSE 3000

CMD ["npm", "run", "start:dev"]