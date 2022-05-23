
FROM node:14-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
# for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python 
RUN yarn install --production
RUN yarn install -g tslint
COPY . /app
RUN yarn build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/build /app/build
COPY package.json /app/build/package.json
# For dev server
COPY . /app
# for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python
RUN yarn install --production

EXPOSE 3000
USER node
CMD yarn start
