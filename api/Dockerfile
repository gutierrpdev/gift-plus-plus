# ====
# BASE
# ====

FROM node:10-alpine as base

# Needed for bcrypt (TODO: ensure this stuff isn't in the final image,
# or use node-native bcrypt)
# RUN apk --no-cache add --virtual builds-deps build-base python

RUN adduser -D -g '' -h /app app

USER app:app
WORKDIR /app


# ================
# BUILD/TEST STAGE
# ================

FROM base as build

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY x-typings /app/x-typings

RUN yarn install --non-interactive --frozen-lockfile

COPY --chown=app:app .  .

RUN yarn build

ENTRYPOINT []


# =============
# RELEASE STAGE
# =============

FROM base as release

COPY --chown=app:app --from=build /app/.cache  .cache
COPY --chown=app:app --from=build /app/package.json ./
COPY --chown=app:app --from=build /app/yarn.lock ./
COPY --chown=app:app --from=build /app/x-typings ./x-typings
COPY --chown=app:app --from=build /app/dist/src ./src
COPY --chown=app:app --from=build /app/dist/migrations ./migrations

RUN yarn install --non-interactive --frozen-lockfile --production

RUN rm -rf /app/.cache

ENV \
  HOST='0.0.0.0'\
  PORT='5000'\
  DEBUG='(INFO|WARN|ERROR):*'

EXPOSE 5000

ENTRYPOINT []
CMD ["node", "src/main.js"]
