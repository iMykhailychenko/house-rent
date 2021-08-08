import { Client } from 'pg';
import dbConfig from '../config/db.config';

const database = new Client(dbConfig);

export default database;
