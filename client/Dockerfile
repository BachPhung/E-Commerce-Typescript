#COMPILE
FROM node:latest as builder
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#RUNNING
FROM node:alpine
WORKDIR /opt/app
COPY --from=builder /opt/app/build /opt/app/build
RUN npm install -g serve
CMD ["serve", "build"]