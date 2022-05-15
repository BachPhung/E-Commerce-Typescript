#COMPILE
FROM node:latest as builder
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#RUNNING
FROM node:latest
WORKDIR /opt/app
COPY --from=builder ["/opt/app"  , "/opt/app"]
CMD [ "node", "dist/server.js" ]
