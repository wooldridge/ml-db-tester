var marklogic = require('marklogic');

var db = marklogic.createDatabaseClient({
  host: 'localhost',
  port: 8002,
  user: 'admin',
  password: 'admin',
  authType: 'digest'
});

db.databases.delete(process.argv[2]).result(
  function(response) {
    console.log('Database deleted: ' + process.argv[2]);
  },
  function(error) {
    console.log('Error: ');
    console.dir(error);
  }
);
