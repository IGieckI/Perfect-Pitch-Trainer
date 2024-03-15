// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import e from "express";
import { env } from "process";

// Global Variables
export const collections: { games?: mongoDB.Collection, stats?: mongoDB.Collection } = {}

/**
 * Connect to the database and set the collections to the global variable.
 */
export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(envVarCheck(process.env.DB_CONN_STRING, "DB_CONN_STRING"));
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const gamesCollection: mongoDB.Collection = db.collection(envVarCheck(process.env.GAMES_COLLECTION_NAME, "GAMES_COLLECTION_NAME"));
    const statsCollection: mongoDB.Collection = db.collection(envVarCheck(process.env.STATS_COLLECTION_NAME, "STATS_COLLECTION_NAME"));
 
    collections.games = gamesCollection;
    collections.stats = statsCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collections: ${gamesCollection.collectionName}, ${statsCollection.collectionName}`);
}

/**
 * Check if all environment variables are defined.
 */
function envVarCheck(envVar: string | undefined, envVarName: string) {
    if (envVar === undefined) {
        throw new Error(envVarName + " is not defined in .env file.");
    }
    return envVar;
}