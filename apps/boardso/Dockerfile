FROM node:18-alpine as base
# RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 3000

# production
FROM base as prod
WORKDIR /app
ENV NODE_ENV=production
RUN npm run build
RUN npm ci
CMD npm start

# development
FROM base as dev
WORKDIR /app
ENV NODE_ENV=development
RUN npm install 
CMD npm run dev