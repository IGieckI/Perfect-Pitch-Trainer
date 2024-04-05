import { ObjectId } from "mongodb";

// nota: datas of stats are not saved in the DB, but are calculated runtime
export default class Stats {
    constructor(public player_id: number, public best_score_infinite: number, public average_accuracy_set_of_notes: number) {}
}