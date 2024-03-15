import { ObjectId } from "mongodb";

export default class SetOfNotesGame {
    constructor(public player_id: number, public n_turns: number, public n_categories: number, public n_correct: number) {}
}