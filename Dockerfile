FROM node:16-alpine as webapp-build-stage

WORKDIR /app
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

RUN npm i -g pnpm --location=global
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Stage --> Production

FROM nginx:stable-alpine as webapp-production-stage

COPY --from=webapp-build-stage /app/dist /usr/share/nginx/html
COPY --from=webapp-build-stage /app/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
