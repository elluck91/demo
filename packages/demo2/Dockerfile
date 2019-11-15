FROM builder
EXPOSE 9002
COPY package.json package-lock.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
COPY server.js .
COPY test test
CMD node server.js