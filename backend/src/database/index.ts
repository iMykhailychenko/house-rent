import { ConnectionManager } from 'typeorm';
import dbConfig from '../config/db.config';

const connectToDb = async (): Promise<void> => {
    const connectionManager = new ConnectionManager();
    const connection = connectionManager.create(dbConfig);

    console.log('Connecting to database ...');
    await connection.connect();

    console.log('Connected');
};

export default connectToDb;
