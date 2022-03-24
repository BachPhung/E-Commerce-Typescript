import app from './app';
import http from 'http';
import config from './middlewares/config';

const server = http.createServer(app);
server.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});