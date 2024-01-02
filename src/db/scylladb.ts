
import cassandra from 'cassandra-driver'
import type { types } from 'cassandra-driver'
import { Player, Submission, Track } from 'src/types';

export async function getScyllaDBCluster() {

  return new cassandra.Client({
    contactPoints: [process.env.SCYLLA_HOSTS!,],
    localDataCenter: process.env.SCYLLA_DATACENTER,
    credentials: { username: process.env.SCYLLA_USER!, password: process.env.SCYLLA_PASSWD! },
    keyspace: process.env.SCYLLA_KEYSPACE,
    encoding: {
      set: Set
    }
  })
}

export function parseTrack(track: types.Row): Track {

  return {
    track_id: track.track_id,
    cover_url: track.cover_url,
    title: track.title,
    duration: track.duration,
    artist: track.artist,
    album: track.album
  } as Track;
}

export function parseSubmission(track: types.Row): Submission {
  return {
    submission_id: track.submission_id,
    song_id: track.song_id,
    user_id: track.user_id,
    modifiers: track.modifiers,
    score: track.score,
    difficulty: track.difficulty,
    instrument: track.instrument,
    stars: track.stars,
    accuracy_percentage: track.accuracy_percentage,
    missed_count: track.missed_count,
    ghost_notes_count: track.ghost_notes_count,
    max_combo_count: track.max_combo_count,
    overdrive_count: track.overdrive_count,
    speed: track.speed,
    played_at: track.played_at
  } as Submission;
  
}

export function parsePlayer(player: types.Row): Player {
  return {
    player_id: player.user_id,
    name: player.name
  } as Player;
}