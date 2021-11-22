const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://hwkoygzu:Zx91dDxqGa_sa6tqgGgKdrAbjop7efIq@kashin.db.elephantsql.com/hwkoygzu",
});

module.exports = pool;
