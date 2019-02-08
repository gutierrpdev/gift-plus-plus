# ====
# BASE
# ====

FROM node:10-alpine as base

RUN adduser -D -g '' -h /app app
USER app:app
WORKDIR /app


# ================
# BUILD/TEST STAGE
# ================

FROM base as build

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install --non-interactive --frozen-lockfile

COPY --chown=app:app .  .

# TODO: Tests are not terminating
# RUN yarn test --ci --all --watch=false --watchAll=false
RUN yarn build
RUN yarn build-storybook

ENTRYPOINT []


# =================
# APP RELEASE STAGE
# =================

FROM nginx:1.15 as app
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# =======================
# STORYBOOK RELEASE STAGE
# =======================

FROM nginx:1.15 as storybook
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]