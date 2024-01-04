ARG PARENT=ubuntu/nginx
ARG NODE_PARENT=node:18.12.1

FROM ${NODE_PARENT} as build
ENV APP_DIR=/app

WORKDIR ${APP_DIR}

RUN env && id
RUN ls -al
USER node

# ADD package-lock.json ${APP_DIR}
# RUN npm ci
ADD package.json ${APP_DIR}
RUN npm install

# ADD --chown=node:node . ${APP_DIR}
ADD . ${APP_DIR}
RUN ls -al 
RUN npm run build

FROM ${PARENT}
ENV PORT=8000

COPY --from=build /app/demo/* /var/www/html
EXPOSE ${PORT}
