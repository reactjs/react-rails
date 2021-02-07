FROM nodesource/trusty:latest

ENV LC_ALL="en_US.UTF-8"

RUN sudo apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt-get update -qq
RUN sudo apt-get install -y -qq yarn

ENV APP_DIR /opt/react-rails
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY . $APP_DIR

RUN yarn install
