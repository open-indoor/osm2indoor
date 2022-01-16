FROM node:16-bullseye

RUN apt-get update && apt-get install -y \
    iproute2 \
    webpack \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /osmindoor

RUN yarn add --dev \
    webpack \
    webpack-cli \
    resolve-cwd \
    jest \
    babel-jest \
    @babel/core \
    @babel/preset-env \
    identity-obj-proxy

RUN yarn global add jest

RUN yarn install
# RUN yarn build
