import { envs } from "./config";
import { AppServer } from "./presentation/server";

(()=>{
    main();
})()

async function main(){
    new AppServer({
        port: envs.PORT
    });
}