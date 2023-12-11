import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { getScyllaDBCluster, parseTrack } from "src/db/scylladb";
import { Track } from "src/types";

export  default async function getTrackLeaderboard(
    req: NextApiRequest,
    res: NextApiResponse<Track>
) {

    const cluster = await getScyllaDBCluster()
    const result = await cluster.execute(`SELECT * FROM leaderboard.tracks WHERE track_id = ?`, [req.query.trackId]);
    const fetchedVideo = result.rows[0];
    if (!fetchedVideo) {
        return res.status(404);
    }

    const track = parseTrack(fetchedVideo)

    return res.status(200).json(track)
}