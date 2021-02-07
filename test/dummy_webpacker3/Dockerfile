FROM ubuntu:trusty

RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y -qq nodejs

RUN apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq
RUN apt-get install -y -qq yarn

ENV APP_DIR /opt/react-rails
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
