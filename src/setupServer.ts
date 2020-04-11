import Koa from 'koa';
import koaCors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import socketIO from 'socket.io';
import http from 'http';
import authRoutes from './routes/authRoutes';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';
import { global } from './socket/global';

async function serverSetUp() {
  const server: Koa = new Koa();
  middleWares(server);
  await startServer(server);
}

function middleWares(server: Koa) {
  server.use(bodyParser());
  server.use(koaCors());
  server.use(authRoutes.routes());
  server.use(ticketRoutes.routes());
  server.use(userRoutes.routes());
}

async function startServer(server: Koa) {
  try {
    const serverPort = 5000;
    // const serverStarted: Promise<void> = new Promise((resolve) => {
    //   server.listen(serverPort, resolve);
    // })
    // await serverStarted;
    // console.log(`Server running on port ${serverPort}`);
    const httpServer = new http.Server(server.callback());
    const io = socketIO(httpServer);
    global(io);
    httpServer.listen(serverPort, () => {
      console.log(`Server running on port ${serverPort}`);
    })
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { serverSetUp };