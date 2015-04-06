# mongodb-connection
*Attention: UNSTABLE - do not use in production!*

Simplifies connection and authorisation with MongoDB

## Usage

**Connect with MongoDB-URL**

    var config = {
      url: 'mongodb://example.com/test_db'
    };

    var mongoConnection = require('mongodb-connection')(config);

    mongoConnection.connect(function(error, db) {

    });

**Connect with credentials**

    var config = {
      url: 'mongodb://example.com/test_db',
      authenticate: {
        user: 'user',
        password: 'passme'
      }
    };

    var mongoConnection = require('mongodb-connection')(config);

    mongoConnection.connect(function(error, db) {

    });

**Connect using a singleton**

    var config = {
      url: 'mongodb://example.com/test_db'
    };

    var mongoConnection = require('mongodb-connection')(config);

    mongoConnection.singleton(function(error, db) {
      //your code here
    });
