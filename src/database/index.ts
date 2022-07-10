import { Pool } from 'pg';
import config from '../config';
const db = new Pool({
  user: config.user,
  host: config.host,
  database: config.db,
  password: config.password,
  port: parseInt(config.db_port as string, 10),
});
db.on('error', (err: Error) => {
  console.log(err.message);
});
export default db;
