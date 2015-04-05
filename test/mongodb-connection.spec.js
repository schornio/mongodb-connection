'use strict';
/* jslint node: true */
/* global describe, it, before */

var expect = require('expect.js');

describe('MongodbConnection', function () {

  process.env.NODE_ENV = 'test';
  var MongodbConnection = require(__dirname + '/../index.js');

  it('should connect to a MongoDB instance by url', function (done) {
    var config = {
      url: 'mongodb://example.com/test_db'
    };
    var stubedConnection = {

    };
    var connectCalled = false;

    var connector = new MongodbConnection(config);
    MongodbConnection._stubClient({
      connect: function (url, callback) {
        expect(url).to.be(config.url);
        connectCalled = true;
        callback(null, stubedConnection);
      }
    });

    connector.connect(function (error, db) {
      expect(db).to.be(stubedConnection);
      expect(connectCalled).to.be(true);
      done();
    });
  });

  it('should connect to a MongoDB instance by db-config-object');

  it('should authorize when credentials are given', function (done) {
    var config = {
      url: 'mongodb://example.com/test_db',
      authenticate: {
        user: 'user',
        password: 'passme'
      }
    };

    var stubedConnection = {
      authenticate: function(username, password, callback) {
        expect(username).to.be(config.authenticate.user);
        expect(password).to.be(config.authenticate.password);
        authCalled = true;
        callback(null, 1);
      }
    };
    var authCalled = false;

    var connector = new MongodbConnection(config);
    MongodbConnection._stubClient({
      connect: function (url, callback) {
        callback(null, stubedConnection);
      }
    });

    connector.connect(function (error, db) {
      expect(db).to.be(stubedConnection);
      expect(authCalled).to.be(true);
      done();
    });
  });

  it('should authorize against admin database');

  it('should provide a singleton', function (done) {
    var config = {
      url: 'mongodb://example.com/test_db'
    };
    var stubedConnection = {

    };
    var connectCalled = 0;

    var connector = new MongodbConnection(config);
    MongodbConnection._stubClient({
      connect: function (url, callback) {
        expect(url).to.be(config.url);
        connectCalled += 1;
        callback(null, stubedConnection);
      }
    });

    connector.singleton(function (error, db) {
      expect(db).to.be(stubedConnection);
      expect(connectCalled).to.be(1);
      connector.singleton(function (error, db) {
        expect(db).to.be(stubedConnection);
        expect(connectCalled).to.be(1);
        done();
      });
    });
  });

  it('should always create a new MongodbConnection on constructor call', function () {
    var cMongodbConnection = MongodbConnection;
    var instance = cMongodbConnection();

    expect(instance).to.be.an(MongodbConnection);
  });

});
