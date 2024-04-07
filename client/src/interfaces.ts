export interface SetOfNotesGame {
    player_id: number,
    n_turns: number,
    n_categories: number,
    n_correct: number,
}

export interface InfiniteGame {
    player_id: number,
    score: number,
}

/**
 * This interface abstracts SetOfNotesGame with more details.
 * It includes Date, which is something that is elaborated on the server.
 * This solution sucks a bit but it works.
 */
export interface SetOfNotesGameStats {
    player_id: number,
    n_turns: number,
    n_categories: number,
    n_correct: number,
    date: Date
}

/**
 * This interface abstracts InfiniteGame with more details.
 * It includes Date, which is something that is elaborated on the server.
 * This solution sucks a bit but it works.
 */
export interface InfiniteGameStats {
    player_id: number,
    score: number,
    date: Date
}
