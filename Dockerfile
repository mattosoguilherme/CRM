FROM node:lts

WORKDIR /guilherme/src/app

COPY package.json .

COPY package-lock.json .

COPY prisma .

RUN npm install
RUN npm install @prisma/client
RUN npm run build
RUN npm run generate

COPY . .


CMD [ "npm run start:dev" ] 