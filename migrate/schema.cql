CREATE KEYSPACE IF NOT EXISTS leaderboard WITH replication = { 'class': 'NetworkTopologyStrategy', 'replication_factor': '3' };


CREATE TABLE IF NOT EXISTS leaderboard.tracks(
	track_id text,
	title text,
	artist text,
	album text,
	cover_url text,
	duration int,
	PRIMARY KEY (track_id)
);

INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES ('kashmir', 'Kashmir', 'Led Zeppelin', 'Mothership', 'https://i.scdn.co/image/ab67616d0000b27322f1b6c28ce5735646b2e569', 517);
INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES ('high-hopes', 'High Hopes', 'Pray for the Wicked', 'Panic! At the Disco', 'https://i.scdn.co/image/ab67616d0000b273c5148520a59be191eea16989', 517);

CREATE TABLE IF NOT EXISTS leaderboard.submissions (
	submission_id timeuuid,
	song_id text,
	user_id text,
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
	PRIMARY KEY (submission_id)
);

CREATE TABLE IF NOT EXISTS leaderboard.song_leaderboard (
	submission_id uuid,
	song_id text,
	user_id text,
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
	PRIMARY KEY ((song_id, modifiers, difficulty, instrument), score)
) WITH CLUSTERING ORDER BY (score DESC);


CREATE MATERIALIZED VIEW leaderboard.user_leaderboard AS
    SELECT *
    	FROM leaderboard.song_leaderboard
    	WHERE 
			song_id IS NOT null AND
			modifiers IS NOT null AND
			difficulty IS NOT null AND
			instrument IS NOT null AND
			score IS NOT null AND
			user_id IS NOT null AND
			played_at IS NOT null
    	PRIMARY KEY ((song_id, modifiers, difficulty, instrument, user_id), score)
    WITH CLUSTERING ORDER BY (score DESC);

INSERT INTO leaderboard.base_leaderboard (song_id,score, modifiers, difficulty, instrument,  played_at) VALUES ('kashmir', 1000, {'none'}, 'expert', 'guitar' ,'2019-01-01 00:00:00+0000');


