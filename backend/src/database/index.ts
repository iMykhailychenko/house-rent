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
        console.log('Connecting to database ...');
        console.log('dbConfig', dbConfig);
        await this.connection.connect();
        console.log('Connected');
    }

    async disconnect(): Promise<void> {
        console.log('Disconnecting from database ...');
        // await this.connection.close();
        console.log('Disconnected');
    }
}

export default new Database();
