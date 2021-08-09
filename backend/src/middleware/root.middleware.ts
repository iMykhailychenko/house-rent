import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const appMiddlewares = async (app: Application): Promise<void> => {
    app.use(morgan('common'));
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
};

export default appMiddlewares;
