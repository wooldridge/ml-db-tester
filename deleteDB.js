var marklogic = require('marklogic'),
    winston = require('winston');

var db = marklogic.createDatabaseClient({
  host: 'localhost',
  port: 8002,
  user: 'admin',
  password: 'admin',
  authType: 'digest'
});

// Use Winston logger
var winston_logger = new winston.Logger({
  level: 'debug',
  transports: [
    new (winston.transports.Console)()
  ]
});
db.setLogger(winston_logger);

db.databases.delete(process.argv[2]).result(
  function(response) {
    console.log('Database deleted: ' + process.argv[2]);
  },
  function(error) {
    console.log('Error: ');
    console.dir(error);
  }
);
