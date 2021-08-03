FROM node:14-alpine as base
RUN mkdir -p /usr/src/todo-backend && chown -R node:node /usr/src/todo-backend
WORKDIR /usr/src/todo-backend

COPY package*.json ./
RUN npm ci --ignore-scripts --prefer-offline --silent --no-progress --no-audit
EXPOSE 3000

FROM base as builder
ARG BRANCH_NAME=branch
ARG COMMIT_SHA=commit_sha
COPY . ./
RUN npm run build

FROM base as prod
ENV NODE_ENV=production
RUN apk update && apk add --upgrade dumb-init
RUN npm ci --only=production --ignore-scripts --prefer-offline --silent --no-progress --no-audit
COPY --from=builder /usr/src/todo-backend/build ./build
COPY --from=builder /usr/src/todo-backend/public ./public
RUN cat public/rev.txt
USER node
CMD ["dumb-init", "npm", "start"]
