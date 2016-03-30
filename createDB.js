var marklogic = require('marklogic');

var db = marklogic.createDatabaseClient({
  host: 'localhost',
  port: 8002,
  user: 'admin',
  password: 'admin',
  authType: 'digest'
});

db.databases.create(process.argv[2]).result(
  function(response) {
    console.log('Database created: ' + process.argv[2]);
  },
  function(error) {
    console.log('Error: ');
    console.dir(error);
  }
);
