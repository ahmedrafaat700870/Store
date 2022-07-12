import db from '../database';
import User from '../types/User.type';
import { Error } from '../interfaces/Error.interface';
class UserMeddle {
  async Create(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning *`;
      const result = await connection.query(sql, [
        user.name,
        user.email,
        user.password,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't create user ${user.name}: ${(error as Error).message}`
      );
    }
  }
  async GetAll(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM users ';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get all users : ${(error as Error).message}`);
    }
  }
  async Get(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM users WHERE id = $1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't get user ${id}: ${(error as Error).message}`);
    }
  }
  async Update(user: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 returning *`;
      const result = await connection.query(sql, [
        user.name,
        user.email,
        user.password,
        user.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't update user ${user.name}: ${(error as Error).message}`
      );
    }
  }
  async Delete(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users WHERE id = $1 returning *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't delete user ${id}: ${(error as Error).message}`);
    }
  }
  async DeleteAll(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users returning *`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't delete all users: ${(error as Error).message}`);
    }
  }
}
export default UserMeddle;
