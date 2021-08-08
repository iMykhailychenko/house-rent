import { Client } from 'pg';
import dbConfig from '../config/db.config';

const database = new Client(dbConfig);

const connectToDb = async (): Promise<void> => {
    console.log('Connecting to database ...');
    await database.connect();
    console.log('Connected');
};

export default connectToDb;
