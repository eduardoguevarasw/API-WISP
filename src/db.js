

import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "deysjrmt_redlink",
  password: "CFBPVNLOyuEZ",
  port: "3306",
  database: "deysjrmt_redlink",
});
