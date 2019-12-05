FROM node:8.16.2-stretch

ENV APP=nodejs
COPY ./${APP} /${APP}
WORKDIR /${APP}
RUN npm install 
EXPOSE 8000
CMD npm start
