ARG PARENT=ubuntu/nginx
ARG NODE_PARENT=node:18.12.1

FROM ${NODE_PARENT} as build
ENV APP_DIR=/app

WORKDIR ${APP_DIR}

USER node

# COPY package-lock.json ${APP_DIR}
# RUN npm ci
COPY package.json ${APP_DIR}
RUN npm install

COPY . ${APP_DIR}
RUN ls -al demo
RUN npm run build
RUN ls -al demo

FROM ${PARENT}
ENV PORT=8000

COPY --from=build /app/demo/* /var/www/html
EXPOSE ${PORT}
