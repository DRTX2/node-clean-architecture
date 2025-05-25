import express, { Router } from "express";
import cors from "cors";

interface Options {
  port?: number;
  routes: Router;
}

export class AppServer {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(
      cors({
        origin: "http://localhost:5173", 
        credentials: true, // por cookies o headers con auth
      })
    );
    //middlewares
    this.app.use(express.json());
    // to use data from x-www-form-urlencoded or json body, extended: true, refers to nested(anidado) objects with complex structures using the property with a  true value.
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
