// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Stats {
    constructor(public max_infinity_level: number, public average_accuracy: number, public id?: ObjectId) {}
}