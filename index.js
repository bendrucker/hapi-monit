'use strict';

exports.register = function (plugin, options, next) {
  plugin.ext('onRequest', function (request, next) {
    if (/^monit\//.test(request.headers['user-agent'])) {
      next('OK');
    }
    else {
      next();
    }
  });
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
