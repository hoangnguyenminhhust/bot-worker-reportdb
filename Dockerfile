FROM node

RUN mkdir /app
WORKDIR /app


COPY package*.json ./

RUN npm i 

COPY . .

ENV NODE_ENV=production
CMD ["npm", "run" , "dev"]