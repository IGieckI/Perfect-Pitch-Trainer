// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Game {
    constructor(public n_turns: number, public n_categories: number, public n_correct: number, public accuracy: number, public id?: ObjectId) {}
}