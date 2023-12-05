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
ARG PUBLIC_BROWSER_BACKEND_URL
ARG BACKEND_URL
ARG ORIGIN

#Env Vars
ENV PUBLIC_BROWSER_BACKEND_URL=${PUBLIC_BROWSER_BACKEND_URL}
ENV PUBLIC_BACKEND_URL=${BACKEND_URL}
ENV ORIGIN=${ORIGIN}

WORKDIR /user/src/app
RUN npm install -g npm@latest
COPY --chown=node:node --from=install-dependencies /user/src/app ./
RUN npm run build


#Todo Serve App from Nginx reverse proxy 3000 -> 80
FROM node:18-slim AS run
WORKDIR /user/src/app
COPY --from=create-build /user/src/app .

EXPOSE 3000
CMD ["node", "build/index.js"]