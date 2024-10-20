# Stage 1 - the build process
FROM node:20.5.0-alpine AS build-deps 
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install
COPY . ./
ENV GENERATE_SOURCEMAP=false
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.21.0-alpine
COPY prod.default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
