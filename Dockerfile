ARG PARENT=ubuntu/nginx
ARG NODE_PARENT=node:18.12.1

FROM ${NODE_PARENT} as build
ENV APP_DIR=/app

WORKDIR ${APP_DIR}

# ADD package-lock.json ${APP_DIR}
# RUN npm ci
COPY package.json ${APP_DIR}
RUN npm install

# user node
ADD --chown=node:node . ${APP_DIR}
RUN npm run build

FROM ${PARENT}
ENV PORT=80

COPY --from=build /app/demo/* /var/www/html
EXPOSE ${PORT}
