# build stage
FROM node:18.17.1-buster

ARG api_root
ENV DISABLE_ESLINT_PLUGIN=true

WORKDIR /miniapp_frontend
COPY frontend/ ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "serve", "--", "--port", "5173"]