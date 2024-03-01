// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { games?: mongoDB.Collection, stats?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const gamesCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME);
    const statsCollection: mongoDB.Collection = db.collection(process.env.STATS_COLLECTION_NAME);
 
    collections.games = gamesCollection;
    collections.stats = statsCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collections: ${gamesCollection.collectionName}, ${statsCollection.collectionName}`);
}
