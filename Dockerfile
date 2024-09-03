FROM node:20

WORKDIR /Home/app

COPY . .

EXPOSE 3000

RUN npm install

CMD [ "node", "app.js" ]