import { ObjectId } from "mongodb";

export default class InfinteGame {
    constructor(public player_id: number, public score: number) {}
}