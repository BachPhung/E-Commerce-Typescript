#COMPILE
FROM node:latest as builder
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#RUNNING
FROM nginx:latest
WORKDIR /opt/app
COPY --from=builder /opt/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]