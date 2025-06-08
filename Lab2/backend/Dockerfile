FROM node:20.10.0

RUN curl -O https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian11-x86_64-100.9.4.deb && \
    apt-get update && \
    apt-get install -y ./mongodb-database-tools-debian11-x86_64-100.9.4.deb && \
    rm mongodb-database-tools-debian11-x86_64-100.9.4.deb && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]