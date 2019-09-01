// Core
import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import dg from 'debug';

// Instruments
import { app } from './server';
import { getPort } from './helpers';

// Initialize DB connection
import { connection } from './db';

const port = getPort();
const server = http.createServer(app);
const debugSrv = dg('server:main');

const onSignal = () => {
    return Promise.all([
        server.close(),
        connection.close(),
    ]);
};
const onShutdown = () => {
    debugSrv('cleanup finished, server is shutting down');
};
const options = {
    signal: 'SIGINT',
    onSignal,
    onShutdown,
};

createTerminus(server, options);

server.listen(port, () => {
    debugSrv(`Server API is up on port ${port}`);
});

export { app, server };
