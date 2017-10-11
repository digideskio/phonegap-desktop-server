FROM node:8.6.0-alpine
MAINTAINER rudd "rudd@adobe.com"

COPY ./package.json /crash-server/package.json

RUN cd /crash-server && NODE_ENV=production npm install
COPY ./ /crash-server/

USER node
ENV NODE_ENV=production PORT=7000

EXPOSE 7000
WORKDIR /crash-server
CMD node server