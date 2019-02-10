FROM node:8

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN mkdir client
COPY client/package.json ./client/
COPY client/yarn.lock ./client/

RUN cd client
RUN yarn
RUN cd ..
RUN yarn

COPY . .

EXPOSE 8080
CMD [ "yarn", "dev" ]
