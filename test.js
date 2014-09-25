'use strict';

var expect = require('chai').expect;
var hapi   = require('hapi');

describe('hapi-monit', function () {

  var server = new hapi.Server();
  server.route({
    method: 'get',
    path: '/',
    handler: function (request, reply) {
      reply('Normal');
    }
  });
  before(function (done) {
    server.pack.register([require('./'), require('inject-then')], done);
  });

  it('sends a 200 response to monit', function () {
    return server.injectThen({
      method: 'get',
      url: '/',
      headers: {
        'User-Agent': 'monit/5.2.5'
      }
    })
    .then(function (response) {
      expect(response.statusCode).to.equal(200);
      expect(response.payload).to.equal('OK');
    });
  });

  it('ignores normal requests', function () {
    return server.injectThen({
      method: 'get',
      url: '/'
    })
    .then(function (response) {
      expect(response.statusCode).to.equal(200);
      expect(response.payload).to.equal('Normal');
    });
  });

});
