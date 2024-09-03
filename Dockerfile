FROM node:22-alpine

WORKDIR /app/common

COPY common/package*.json ./
COPY common/ ./


RUN npm install


WORKDIR /app/frontend

COPY frontend/package*.json ./
COPY frontend/ ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

