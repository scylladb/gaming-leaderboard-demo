import { types } from "cassandra-driver";
import { NextApiRequest, NextApiResponse } from "next";
import { getScyllaDBCluster, parseTrack } from "src/db/scylladb";
import { Track } from "src/types";

const userId = 'scylla-user';

export default async function listVideos(
    req: NextApiRequest,
    res: NextApiResponse<Track[]>
) {
    const cluster = await getScyllaDBCluster();
    
    const rawTracks = await cluster.execute("SELECT * FROM leaderboard.tracks LIMIT 9");


    const trackCollection = rawTracks.rows.map(async (rawTrack) => {
        // let progressQuery = "SELECT progress FROM streaming.watch_history WHERE user_id = ? AND video_id = ?"
        // const progress = await cluster.execute(progressQuery, [userId, rawTrack.id], { prepare: true });

        return parseTrack(rawTrack)
    });

    return res.status(200).json(await Promise.all(trackCollection));
}

function getProgress(progress: types.ResultSet): number {
    let firstRow = progress.first();

    if (!firstRow) {
        return 0;
    }

    return progress.first().get('progress') ?? 0;
}