// Core
import connectMongo from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';

// Instruments
import { getPassword } from '../helpers/env';

const MongoStore = connectMongo(session);

export const sessionOptions = {
    key:               'user',
    secret:            getPassword(),
    resave:            false,
    rolling:           true,
    saveUninitialized: false,
    store:             new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie:            {
        httpOnly: true,
        maxAge:   15 * 60 * 1000,
    },
};
