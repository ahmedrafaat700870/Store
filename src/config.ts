import dotenv from 'dotenv';
dotenv.config();
const {
  PORT,
  PGHOST,
  PGUSER,
  PGDATABASE_DEV,
  PGDATABASE_TEST,
  PGPASSWORD,
  PGPORT,
} = process.env;
export default {
  port: PORT,
  host: PGHOST,
  user: PGUSER,
  db: PGDATABASE_DEV,
  db_test: PGDATABASE_TEST,
  password: PGPASSWORD,
  db_port: PGPORT,
};
