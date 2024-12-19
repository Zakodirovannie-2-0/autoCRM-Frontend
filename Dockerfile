FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "preview"]

EXPOSE 4173