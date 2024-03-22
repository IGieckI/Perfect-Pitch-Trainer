import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import e from "express";

export const collections: { stats?: mongoDB.Collection, infinite_games?: mongoDB.Collection, set_of_notes_games?: mongoDB.Collection } = {}

dotenv.config();

const client: mongoDB.MongoClient = new mongoDB.MongoClient(envVarCheck(process.env.DB_CONN_STRING, "DB_CONN_STRING"));

// Ensure connection to the DB
connectToDatabase();

/**
 * Connect to the database and set the collections to the global variable.
 */
export function connectToDatabase() {            
    client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const statsCollection: mongoDB.Collection = db.collection(envVarCheck(process.env.STATS_COLLECTION_NAME, "STATS_COLLECTION_NAME"));
    const infiniteGamesCollection: mongoDB.Collection = db.collection(envVarCheck(process.env.INFINITE_GAMES_COLLECTION_NAME, "INFINITE_GAMES_COLLECTION_NAME"));
    const setOfNotesGamesCollection: mongoDB.Collection = db.collection(envVarCheck(process.env.SET_OF_NOTES_GAMES_COLLECTION_NAME, "SET_OF_NOTES_GAMES_COLLECTION_NAME"));
 
    collections.stats = statsCollection;
    collections.infinite_games = infiniteGamesCollection;
    collections.set_of_notes_games = setOfNotesGamesCollection;
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