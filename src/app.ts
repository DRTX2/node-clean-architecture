import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { AppServer } from "./presentation/server";

(()=>{
    main();
})()

async function main(){
    new AppServer({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });
}