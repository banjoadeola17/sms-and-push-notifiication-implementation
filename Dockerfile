FROM node:12

MAINTAINER banjoadeola17@gmail.com

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

#copy all project files into image
COPY . ./

EXPOSE 80

CMD [ "node", "src/index.js" ]
