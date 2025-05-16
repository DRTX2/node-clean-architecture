import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { AppServer } from "./presentation/server";

(()=>{
    main();
})()

async function main(){
    const server= new AppServer({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });
    await server.start();
}