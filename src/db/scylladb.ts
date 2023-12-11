
import cassandra from 'cassandra-driver'
import type { types } from 'cassandra-driver'
import { Track } from 'src/types';

export async function getScyllaDBCluster() {

  return new cassandra.Client({
    contactPoints: [process.env.SCYLLA_HOSTS!,],
    localDataCenter: process.env.SCYLLA_DATACENTER,
    credentials: { username: process.env.SCYLLA_USER!, password: process.env.SCYLLA_PASSWD! },
    keyspace: process.env.SCYLLA_KEYSPACE
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