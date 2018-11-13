hapi-monit [![Build Status](https://travis-ci.org/bendrucker/hapi-monit.svg?branch=master)](https://travis-ci.org/bendrucker/hapi-monit) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/hapi-monit.svg)](https://greenkeeper.io/)
==========

Hapi plugin for passing monit health checks. Created for use with AWS OpsWorks which uses monit to check the health of Node servers. If you serve a 200 response for GET requests to `/`, you don't need this plugin. But if you can't or would prefer not to serve at your server root, this will prevent monit from restarting your server on every check. 
