'use strict';

exports.register = function (server, options, next) {
  server.ext('onRequest', function (request, reply) {
    if (/^monit\//.test(request.headers['user-agent'])) {
      reply();
    }
    else {
      reply.continue();
    }
  });
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
