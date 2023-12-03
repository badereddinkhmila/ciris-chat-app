# Installing dependencies:
FROM node:18 AS install-dependencies
WORKDIR /user/src/app
RUN npm install -g npm@latest
COPY package.json package-lock.json ./
RUN npm ci
COPY . .


# Creating a build:
FROM node:18 AS create-build

#Build ARGS
ARG BACKEND_URL

#Env Vars
ENV PUBLIC_BACKEND_URL=$PUBLIC_BACKEND_URL

WORKDIR /user/src/app
RUN npm install -g npm@latest
COPY --chown=node:node --from=install-dependencies /user/src/app ./
RUN npm run build


# Serve App from Nginx rvp
FROM node:18-slim AS run
WORKDIR /user/src/app
COPY --from=create-build /user/src/app .

CMD ["node", "build/index.js"]