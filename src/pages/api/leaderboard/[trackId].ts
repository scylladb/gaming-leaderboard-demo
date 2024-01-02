import { ConstructionOutlined } from "@mui/icons-material";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { getScyllaDBCluster, parseSubmission, parseTrack } from "src/db/scylladb";
import { Submission, Track } from "src/types";


export type SubmissionResponse = {
    track: Track,
    submissions: Submission[]
};

type SubmissionQueryDTO = {

}

export default async function getTrackLeaderboard(
    req: NextApiRequest,
    res: NextApiResponse<SubmissionResponse>
) {
    const cluster = await getScyllaDBCluster()
    const trackId = req.query.trackId;
    let track = await getTrack(cluster, trackId);
    let submissions =  await getSubmissions(cluster, trackId, req.query?.instrument ?? 'guitar', req.query?.difficulty ?? 'expert+' , req.query?.modifiers ?? '');
    

    const response = {
        track: track,
        submissions: submissions
    };

    return res.status(200).json(response);
}

async function getSubmissions(cluster, trackId, instrument, difficulty, modifiers) {


    const result = await cluster.execute(`SELECT * FROM leaderboard.song_leaderboard WHERE song_id = ? AND modifiers = ? AND difficulty = ? AND instrument = ?`, [
        trackId,
        modifiers.split(',') as Set<string>,
        difficulty,
        instrument
    ]);
    
    
    return result.rows.map(parseSubmission);
}

async function getTrack(cluster, trackId) {
    const result = await cluster.execute(`SELECT * FROM leaderboard.tracks WHERE track_id = ?`, [trackId]);
    
    return parseTrack(result.rows[0])
}