import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  private static isConnected=false;

  static async connect(options: Options) {
    if(this.isConnected){
      console.log("[INFO] Mongo is already connected");
      return;
    }

    const { dbName, mongoUrl } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      this.isConnected=true;
        console.log('[OK] Mongo connection error');
    } catch (error) {
        console.log('[ERROR] Mongo connection error');
        throw error;
    }
  }

  static async disconnect():Promise<void>{
    if(!this.isConnected) return;

    await mongoose.disconnect();
    this.isConnected=false;
    console.log("[OK] MongoDB connection closed");
  }
}
