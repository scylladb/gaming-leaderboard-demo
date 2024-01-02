CREATE KEYSPACE IF NOT EXISTS leaderboard WITH replication = { 'class': 'NetworkTopologyStrategy', 'replication_factor': '3' };

CREATE TABLE IF NOT EXISTS leaderboard.players(
	player_id text,
	name text,
	PRIMARY KEY (player_id)
);

CREATE TABLE IF NOT EXISTS leaderboard.tracks(
	track_id text,
	title text,
	artist text,
	album text,
	cover_url text,
	duration int,
	PRIMARY KEY (track_id)
);


CREATE TABLE IF NOT EXISTS leaderboard.submissions (
	submission_id uuid,
	track_id text,
	player_id text,
	modifiers frozen<set<text>>,
	score int,
	difficulty text,
	instrument text,
	stars int,
	accuracy_percentage float,
	missed_count int,
	ghost_notes_count int,
	max_combo_count int,
	overdrive_count int,
	speed int,
	played_at timestamp,
	PRIMARY KEY (submission_id, played_at)
);

CREATE MATERIALIZED VIEW leaderboard.user_submissions AS
    SELECT *
    	FROM leaderboard.submissions
    	WHERE 
			submission_id IS NOT null AND
			player_id IS NOT null AND
			played_at IS NOT null
    	PRIMARY KEY ((player_id), played_at, submission_id)
    WITH CLUSTERING ORDER BY (played_at DESC);


CREATE TABLE IF NOT EXISTS leaderboard.song_leaderboard (
	submission_id uuid,
	track_id text,
	player_id text,
	modifiers frozen<set<text>>,
	score int,
	difficulty text,
	instrument text,
	stars int,
	accuracy_percentage float,
	missed_count int,
	ghost_notes_count int,
	max_combo_count int,
	overdrive_count int,
	speed int,
	played_at timestamp,
	PRIMARY KEY ((track_id, modifiers, difficulty, instrument), score)
) WITH CLUSTERING ORDER BY (score DESC);

