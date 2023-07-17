FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD npm install && \
    npx knex migrate:latest && \
    npx knex seed:run && \
    npm run start

    