const db = require('./db-config');

db.raw('CREATE DATABASE api-test;')
.then(function(result){
    console.log('Database `api-test`created\n',result);
})
.finally(function(){
    console.log('Done');
})