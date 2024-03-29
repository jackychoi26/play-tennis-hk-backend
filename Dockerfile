FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
CMD npm install && \
    npx knex migrate:latest && \
    npm run start

    