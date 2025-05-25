import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { MySQLDatabase } from "./data/mysql/mysql-database";
import { AppRoutes } from "./presentation/routes";
import { AppServer } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  switch (envs.DB_PREFERED) {//todo: create an specific class to make connection
    case "mysql":
      await MySQLDatabase.connect({
        databaseUrl: envs.MYSQL_URL,
        dbName: envs.MYSQL_DB,
      });
      break;
    case "mongo":
      await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
      });
      break;
  }

  const server = new AppServer({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  await server.start();
}
