// lib/db.ts
import mysql from 'mysql2/promise';

interface DbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
}

const config: DbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(config);

export function getDbConfigStatus() {
  const missing: string[] = [];

  if (!process.env.DB_HOST) missing.push('DB_HOST');
  if (!process.env.DB_USER) missing.push('DB_USER');
  if (!process.env.DB_NAME) missing.push('DB_NAME');

  return missing;
}

export default pool;

// Helper type for database rows
export type RowDataPacket = mysql.RowDataPacket;
export type OkPacket = mysql.OkPacket;
export type ResultSetHeader = mysql.ResultSetHeader;
