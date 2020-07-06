import express, { Application } from "express";
import { useExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";
import { authChecker, currentUserChecker } from "./middleware/authChecker";
import { DefaultErrorHandler } from "./middleware/errorHandler";
import { morganLogger } from "./middleware/morganLogger";
import * as dbConfig from "./ormconfig";
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import { BundlesController } from "./controllers/bundleController";
import { UserController } from "./controllers/userController";

export const createApp = async (): Promise<Application> => {
  // Connecting Database
  console.log(dbConfig);
  try {
    // @ts-ignore
    await createConnection(dbConfig as ConnectionOptions);
  } catch (e) {
    console.log("TypeORM connection error: ", e);
    process.abort();
  }

  console.log(process.env);

  const app = express();
  app.use(morganLogger);
  useExpressServer(app, {
    authorizationChecker: authChecker,
    controllers: [BundlesController, UserController],
    cors: {
      origin: "*",
    },
    currentUserChecker: currentUserChecker,
    middlewares: [DefaultErrorHandler],
    validation: true,
  });

  return require("http").Server(app);
};
