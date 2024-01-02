INSERT INTO leaderboard.song_leaderboard (
    submission_id,
	track_id,
	player_id,
	modifiers,
	score,
	difficulty,
	instrument,
	stars,
	accuracy_percentage,
	missed_count,
	ghost_notes_count,
	max_combo_count,
	overdrive_count,
	speed,
	played_at
) VALUES (
    b5ee3f80-40f9-4dfd-9fb6-13a6c94147a3,
    'age-of-machine',
    'fabiobarkoski',
    {'none'},
    133700,
    'expert',
    'guitar',
    5,
    100,
    0,
    0,
    2,
    10,
    1,
    '2023-11-23 00:00:00'
);

INSERT INTO leaderboard.song_leaderboard (
    submission_id,
	track_id,
	player_id,
	modifiers,
	score,
	difficulty,
	instrument,
	stars,
	accuracy_percentage,
	missed_count,
	ghost_notes_count,
	max_combo_count,
	overdrive_count,
	speed,
	played_at
) VALUES (
    0897f46c-edc7-4190-b171-b1c88c3e9d16,
    'age-of-machine',
    'danielhe4rt',
    {'none'},
    123700,
    'expert',
    'guitar',
    5,
    100,
    0,
    0,
    2,
    9,
    1,
    '2023-11-23 00:00:00'
);

INSERT INTO leaderboard.song_leaderboard (
    submission_id,
	track_id,
	player_id,
	modifiers,
	score,
	difficulty,
	instrument,
	stars,
	accuracy_percentage,
	missed_count,
	ghost_notes_count,
	max_combo_count,
	overdrive_count,
	speed,
	played_at
) VALUES (
    0897f46c-edc7-4190-b171-b1c88c3e9d16,
    'high-hopes',
    'cherryramatisdev',
    {'none'},
    1000000,
    'expert',
    'guitar',
    5,
    100,
    0,
    0,
    2,
    9,
    1,
    '2023-11-23 00:00:00'
);

INSERT INTO leaderboard.song_leaderboard (
    submission_id,
	track_id,
	player_id,
	modifiers,
	score,
	difficulty,
	instrument,
	stars,
	accuracy_percentage,
	missed_count,
	ghost_notes_count,
	max_combo_count,
	overdrive_count,
	speed,
	played_at
) VALUES (
    0897f46c-edc7-4190-b171-b1c88c3e9d16,
    'high-hopes',
    'cherryramatisdev',
    {'none'},
    1000000,
    'expert',
    'guitar',
    5,
    100,
    0,
    0,
    2,
    9,
    1,
    '2023-11-23 00:00:00'
);

INSERT INTO leaderboard.song_leaderboard (
    submission_id,
	track_id,
	player_id,
	modifiers,
	score,
	difficulty,
	instrument,
	stars,
	accuracy_percentage,
	missed_count,
	ghost_notes_count,
	max_combo_count,
	overdrive_count,
	speed,
	played_at
) VALUES (
    0897f46c-edc7-4190-b171-b1c88c3e9d16,
    'high-hopes',
    'cherryramatisdev',
    {'none'},
    1000000,
    'expert',
    'guitar',
    5,
    100,
    0,
    0,
    2,
    9,
    1,
    '2023-11-23 00:00:00'
);

INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES ('kashmir', 'Kashmir', 'Led Zeppelin', 'Mothership', 'https://i.scdn.co/image/ab67616d0000b27322f1b6c28ce5735646b2e569', 517);
INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES ('high-hopes', 'High Hopes',  'Panic! At the Disco', 'Pray for the Wicked','https://i.scdn.co/image/ab67616d0000b273c5148520a59be191eea16989', 517,);
INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES ('instant-crush', 'Instant Crush',  'Daft Punk', 'Random Access Memories','https://i.scdn.co/image/ab67616d0000b273c5148520a59be191eea16989', 337,);
INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES ('cant-help-falling-in-love', 'Can\'t Help Falling in Love',  'Elvis Presley', 'Blue Hawaii','https://i.scdn.co/image/ab67616d0000b273f96cefb0197694ad440c3314', 183,);
INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES ('faint', 'Faint',  'Linkin Park', 'Meteora','https://i.scdn.co/image/ab67616d0000b273b4ad7ebaf4575f120eb3f193', 162),;
INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES ('smooth-criminal', 'Smooth Criminal',  'Michael Jackson', 'BAD','https://i.scdn.co/image/ab67616d0000b2731bb21d27effb96a1d0fe8d6d', 212);

INSERT INTO leaderboard.submissions (submission_id, player_id, played_at) VALUES (ce772595-7b3b-48d8-b993-d323d1149165, 'danielhe4rt', '2019-01-01 00:00:00+0000');
INSERT INTO leaderboard.submissions (submission_id, player_id, played_at) VALUES (2ebc2ae5-742c-405f-978a-0ffc33fc9d6e, 'danielhe4rt', '2019-01-03 00:00:00+0000');
INSERT INTO leaderboard.submissions (submission_id, player_id, played_at) VALUES (0df45aee-837a-433e-b4cc-506a1e1c367a, 'danielhe4rt', '2019-01-02 00:00:00+0000');


SELECT * FROM user_leaderboards 
WHERE 
	AND modifiers = {'none'} 
	AND difficulty = 'expert' 
	AND instrument = 'guitar' 
	AND player_id = 'danielhe4rt' 
LIMIT 10;



INSERT INTO leaderboard.song_leaderboard (track_id, score, modifiers, difficulty, instrument,  played_at, player_id) VALUES 
('high-hopes', 1000, {'no-modifiers'}, 'expert+', 'guitar' ,'2019-01-01 00:00:00+0000', 'danielreis');


