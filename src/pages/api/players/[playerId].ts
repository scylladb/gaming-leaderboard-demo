import { types } from "cassandra-driver";
import { NextApiRequest, NextApiResponse } from "next";
import { getScyllaDBCluster, parsePlayer, parseSubmission } from "src/db/scylladb";
import { Player, Submission } from "src/types";

export type PlayerProfileResponse = {
    player: Player,
    submissionHistory: Submission[],
}

export default async function playerHistory(
    req: NextApiRequest,
    res: NextApiResponse<PlayerProfileResponse>
) {
    const playerId = req.query.playerId;
    const cluster = await getScyllaDBCluster();
    
    const rawPlayer = await cluster.execute("SELECT * FROM leaderboard.players WHERE player_id = ?", [playerId]);

    const rawSubmissions = await cluster.execute("SELECT * FROM leaderboard.user_submissions WHERE player_id = ?", [playerId]);

    const response = {
        player: parsePlayer(rawPlayer.first()),
        submissionHistory: rawSubmissions.rows.map(parseSubmission)
    };

    return res.status(200).json(response);
}
