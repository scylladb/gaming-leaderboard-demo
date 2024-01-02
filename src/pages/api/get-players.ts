import { types } from "cassandra-driver";
import { NextApiRequest, NextApiResponse } from "next";
import { getScyllaDBCluster, parsePlayer } from "src/db/scylladb";
import { Player } from "src/types";

const userId = 'scylla-user';

export default async function listVideos(
    req: NextApiRequest,
    res: NextApiResponse<Player[]>
) {
    const cluster = await getScyllaDBCluster();
    
    const rawPlayers = await cluster.execute("SELECT * FROM leaderboard.players LIMIT 9");

    const trackCollection = rawPlayers.rows.map(parsePlayer);

    return res.status(200).json(trackCollection);
}

function getProgress(progress: types.ResultSet): number {
    let firstRow = progress.first();

    if (!firstRow) {
        return 0;
    }

    return progress.first().get('progress') ?? 0;
}