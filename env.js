/*-- Localhost --*/
// const env = {
//     database: 'otop',
//     username: 'root',
//     password: '',
//     host: '127.0.0.1',
//     dialect: 'mysql',
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };

/*-- Host Heroku --*/
const env = {
  database: 'heroku_af31d67d16903c4',
  username: 'bfadb6e62834bc',
  password: '6a8be4ce',
  host: 'us-cdbr-east-03.cleardb.com',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
  
  module.exports = env;