FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
CMD npm install && \
    npx knex migrate:latest && \
    npx knex seed:run && \
    npm run start

    