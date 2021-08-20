import { Connection, ConnectionManager } from 'typeorm';
import dbConfig from '../config/db.config';

class Database {
    static _instance: Database = null;

    public connectionManager: ConnectionManager;
    public connection: Connection;

    constructor() {
        if (Database._instance) return Database._instance;
        this.connectionManager = new ConnectionManager();
        this.connection = this.connectionManager.create(dbConfig);
    }

    async connect(): Promise<void> {
        if (process.env.NODE_ENV !== 'test') console.log('Connecting to database ...');
        await this.connection.connect();
    }

    async disconnect(): Promise<void> {
        if (!this.connection) return;
        if (process.env.NODE_ENV !== 'test') console.log('Disconnecting from database ...');
        await this.connection.close();
    }
}

const database = new Database();
export default database;
