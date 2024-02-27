FROM node:alpine

EXPOSE 3001

WORKDIR /opt/server

COPY ./src /opt/server/src
COPY *.json /opt/server/

RUN npm i
RUN npm run migration:run

CMD [ "npm", "start" ]