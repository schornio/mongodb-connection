'use strict';
/* jslint node: true */

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

function MongodbConnection(config) {
  if(!(this instanceof MongodbConnection)) {
    return new MongodbConnection(config);
  }

  this.config = config;
}

MongodbConnection.mongodb = mongodb;

MongodbConnection.prototype.connect = function (callback) {
  var self = this;

  MongoClient.connect(this.config.url, function (error, db) {
    if(error) {
      return callback(error);
    }

    if(self.config.authenticate) {
      db.authenticate(self.config.authenticate.user, self.config.authenticate.password, function (error) {
        if(error) {
          return callback(error);
        }

        callback(null, db);
      });
    } else {
      callback(null, db);
    }
  });
};

MongodbConnection.prototype.singleton = function (callback) {
  var self = this;

  if(this.singletonInstance) {
    process.nextTick(function () {
      callback(null, self.singletonInstance);
    });
  } else {
    this.connect(function (error, connection) {
      self.singletonInstance = connection;
      callback(error, connection);
    });
  }
};

module.exports = MongodbConnection;

/* istanbul ignore next */
if(process.env.NODE_ENV === 'test') {
  module.exports._stubClient = function (clientStub) {
    MongoClient = clientStub;
  };
}
