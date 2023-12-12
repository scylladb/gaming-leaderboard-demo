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
INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES ('high-hopes', 'High Hopes',  'Panic! At the Disco', 'Pray for the Wicked','https://i.scdn.co/image/ab67616d0000b273c5148520a59be191eea16989', 517);

CREATE TABLE IF NOT EXISTS leaderboard.submissions (
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
	PRIMARY KEY (submission_id, played_at)
);

CREATE MATERIALIZED VIEW leaderboard.user_submissions AS
    SELECT *
    	FROM leaderboard.submissions
    	WHERE 
			submission_id IS NOT null AND
			user_id IS NOT null AND
			played_at IS NOT null
    	PRIMARY KEY (user_id, played_at, submission_id)
    WITH CLUSTERING ORDER BY (played_at DESC);

INSERT INTO leaderboard.submissions (submission_id, user_id, played_at) VALUES (ce772595-7b3b-48d8-b993-d323d1149165, 'danielhe4rt', '2019-01-01 00:00:00+0000');
INSERT INTO leaderboard.submissions (submission_id, user_id, played_at) VALUES (2ebc2ae5-742c-405f-978a-0ffc33fc9d6e, 'danielhe4rt', '2019-01-03 00:00:00+0000');
INSERT INTO leaderboard.submissions (submission_id, user_id, played_at) VALUES (0df45aee-837a-433e-b4cc-506a1e1c367a, 'danielhe4rt', '2019-01-02 00:00:00+0000');

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

CREATE TABLE IF NOT EXISTS leaderboard.user_leaderboard (
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
	PRIMARY KEY ((user_id, modifiers, difficulty, instrument), score)
) WITH CLUSTERING ORDER BY (score DESC);


-- CREATE MATERIALIZED VIEW leaderboard.user_leaderboard AS
--     SELECT *
--     	FROM leaderboard.song_leaderboard
--     	WHERE 
-- 			modifiers IS NOT null AND
-- 			difficulty IS NOT null AND
-- 			instrument IS NOT null AND
-- 			score IS NOT null AND
-- 			user_id IS NOT null AND
-- 			played_at IS NOT null
--     	PRIMARY KEY ((modifiers, difficulty, instrument, user_id), song_id, score)
--     WITH CLUSTERING ORDER BY (score DESC);

SELECT * FROM user_leaderboards 
WHERE 
	modifiers = {'none'} 
	AND difficulty = 'expert' 
	AND instrument = 'guitar' 
	AND user_id = 'danielhe4rt' 
LIMIT 10;



INSERT INTO leaderboard.base_leaderboard (song_id,score, modifiers, difficulty, instrument,  played_at) VALUES ('kashmir', 1000, {'none'}, 'expert', 'guitar' ,'2019-01-01 00:00:00+0000');


