# FROM node:19.7.0-alpine3.17 as development

# WORKDIR /app

# COPY . .

# RUN npm install

# RUN npm run build

# CMD ["npm", "run", "start:prod"]

FROM node:19.5.0-alpine3.17 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:19.5.0-alpine3.17 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
