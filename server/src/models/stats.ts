// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Stats {
    constructor(public max_infinite_level: number, public average_infinite_accuracy: number, public id?: ObjectId) {}
}