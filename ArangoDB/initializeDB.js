const arangojs = require('arangojs');

const db = arangojs({
  url: "http://localhost:8989",
  databaseName: "myDatabase",
  auth: { username: "admin", password: "hunter2" },
});
