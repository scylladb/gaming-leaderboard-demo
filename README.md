# Gaming Leaderboard Demo  - Next.js + ScyllaDB application
This repository contains a sample gaming leaderboard application built with [Blitz.js](https://blitzjs.com/), [Material-UI](https://mui.com/material-ui/) and [ScyllaDB](https://www.scylladb.com/).

## Prerequisites
* [NodeJS](https://nodejs.org/en)
* [ScyllaDB Cloud account](https://cloud.scylladb.com/account/sign-up)

## Get started

**Clone the repository**
```
git clone https://github.com/zseta/video-streaming
```

### Configuration file

Create a new configuration file named `.env.local` in the project's root folder. This file contains your ScyllaDB cluster credentials:
```
# .env.local
APP_BASE_URL="http://localhost:8000"
SCYLLA_HOSTS="node-0.aws_eu_central_1.xxxxx.clusters.scylla.cloud"
SCYLLA_USER="scylla"
SCYLLA_PASSWD="xxxxx"
SCYLLA_KEYSPACE="streaming"
SCYLLA_DATACENTER="AWS_EU_CENTRAL_1"
```

You can copy the `SCYLLA_HOSTS`, `SCYLLA_USER`, `SCYLLA_PASSWD` and `SCYLLA_DATACENTER` values from your ScyllaDB Cloud dashboard. Keyspace should be `streaming`.

### Install project requirements
```
npm install
```

### Create database schema and tables
Run the following command to migrate the database and load sample data.
```
npm run migrate
```

This creates the following structure in your database:
```
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
    WITH CLUSTERING ORDER BY (score DESC);KEY (user_id, video_id)
);
```

**Start the app:**
```
npm run dev
> video-streaming@1.0.0 dev
> blitz dev

✔ Next.js was successfully patched with a React Suspense fix
✔ Routes manifest was successfully generated
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

Go to http://localhost:3000 to open the app.

![app screenshot](/public/app_screen.png)
