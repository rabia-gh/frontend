FROM  node:latest AS node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

COPY package-lock.json .

RUN npm install
RUN npm install -g @angular/cli

COPY . /usr/src/app

EXPOSE 4200/tcp

CMD ng serve --host 0.0.0.0