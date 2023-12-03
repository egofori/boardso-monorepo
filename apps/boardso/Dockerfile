ARG NEXT_PUBLIC_API_BASE_URL

FROM node:18-alpine as base
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
# RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/root/.npm
EXPOSE 3000

# production
FROM base as prod
WORKDIR /app
ENV NODE_ENV=production
RUN npm ci
RUN npm run build -w boardso
CMD npm start -w boardso

# development
FROM base as dev
WORKDIR /app
ENV NODE_ENV=development
RUN npm install 
CMD npm run dev -w boardso