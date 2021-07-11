FROM node:14-alpine

WORKDIR /app

COPY package.json lerna.json yarn.lock /app/
COPY packages/core/package.json /app/packages/core/package.json
COPY packages/api/package.json /app/packages/api/package.json

RUN yarn install --production --frozen-lockfile --emoji false

ADD packages/core/dist /app/packages/core/dist/
ADD packages/api/dist /app/packages/api/dist/

EXPOSE 8080

CMD [ "node", "./packages/api/dist/index.js" ]
