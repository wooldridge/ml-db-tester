var marklogic = require('marklogic'),
    bunyan = require('bunyan');

var db = marklogic.createDatabaseClient({
  host: 'localhost',
  port: 8002,
  user: 'admin',
  password: 'admin',
  authType: 'digest'
});

// Use Bunyan logger
function LogStream() {}
LogStream.prototype.write = function (rec) {
    console.log('[%s] %s: %s',
        rec.time.toISOString(),
        bunyan.nameFromLevel[rec.level],
        rec.msg);
}
var bunyan_logger = bunyan.createLogger({
  name: 'bunyan logger',
  streams: [
    {
      level: 'debug',
      stream: new LogStream(),
      type: 'raw'
    }
  ]
});
db.setLogger(bunyan_logger);

db.databases.create(process.argv[2]).result(
  function(response) {
    console.log('Database created: ' + process.argv[2]);
  },
  function(error) {
    console.log('Error: ');
    console.dir(error);
  }
);
