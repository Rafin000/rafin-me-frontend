# Stage 1 - build the Vite SPA
FROM node:20.5.0-alpine AS build-deps
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./
ENV GENERATE_SOURCEMAP=false
# Base URL for static assets (logo, profile picture, header image).
ARG VITE_ASSETS_BASE_URL
ENV VITE_ASSETS_BASE_URL=$VITE_ASSETS_BASE_URL
RUN yarn build

# Stage 2 - nginx, configured at start-up for Cloud Run
FROM nginx:1.27-alpine

# nginx:alpine runs every *.template in this directory through envsubst at
# start-up, writing the result into /etc/nginx/conf.d/. That is how $PORT
# (injected by Cloud Run) and $API_HOST reach the config.
COPY prod.default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html

ENV PORT=8080
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d

EXPOSE 8080
