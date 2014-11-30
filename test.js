'use strict';

var expect = require('chai').expect;
var hapi   = require('hapi');

describe('hapi-monit', function () {

  var server = new hapi.Server();
  server.connection();
  server.route({
    method: 'get',
    path: '/',
    handler: function (request, reply) {
      reply('Normal');
    }
  });
  before(function (done) {
    server.register(require('./'), done);
  });

  it('sends a 200 response to monit', function (done) {
    server.inject({
      method: 'get',
      url: '/ping',
      headers: {
        'User-Agent': 'monit/5.2.5'
      }
    }, function (response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('ignores normal requests', function (done) {
    server.inject({
      method: 'get',
      url: '/'
    }, function (response) {
      expect(response.statusCode).to.equal(200);
      expect(response.payload).to.equal('Normal');
      done();
    });
  });

});
