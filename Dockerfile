FROM node:18
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]