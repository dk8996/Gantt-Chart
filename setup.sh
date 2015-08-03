#!/bin/sh
function install_npm_module_globally(){
    sudo npm install -g $1
}

#install_npm_module_globally yo
install_npm_module_globally bower
install_npm_module_globally foreman
install_npm_module_globally phantomjs
install_npm_module_globally istanbul #code coverage
install_npm_module_globally karma
install_npm_module_globally grunt-cli

#install node dependencies
npm install

#instal bower components

#bower install using only https
git config url."https://".insteadOf git://

bower install

#Workaround for Bower issues - does not install angular-ui-router-min.js library.
curl -v cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.0/angular-ui-router.min.js > app/bower_components/angular-ui-router/release/angular-ui-router.min.js
