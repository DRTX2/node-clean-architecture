//file like adapter pattern

import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  DB_PREFERED:get("DB_PREFERED").required().asString(),

  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),

  MYSQL_URL: get("MYSQL_URL").required().asString(),
  MYSQL_DB:get("MYSQL_DB").required().asString(),
};
