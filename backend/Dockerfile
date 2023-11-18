FROM node:18 as create-build
WORKDIR /usr/src/app

#Build ARGS
ARG DATABASE_URL

#Env Vars
ENV DATABASE_URL=$DATABASE_URL

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-slim AS run
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /usr/src/app
COPY --chown=node:node --from=create-build /usr/src/app/dist ./dist
COPY --chown=node:node --from=create-build /usr/src/app/.env .env
COPY --chown=node:node --from=create-build /usr/src/app/package.json .
COPY --chown=node:node --from=create-build /usr/src/app/package-lock.json .
RUN npm install --omit=dev
COPY --chown=node:node --from=create-build /usr/src/app/node_modules/.prisma/client  ./node_modules/.prisma/client

ENV NODE_ENV production
EXPOSE 8000
CMD ["dumb-init", "node", "dist/main"]
