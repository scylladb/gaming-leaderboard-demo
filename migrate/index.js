const cassandra = require('cassandra-driver');
const path = require('path');
const fs = require('fs');
const { randomUUID } = require('crypto');
require('dotenv').config({ path: '.env' });

function readCql(cql) {
    return fs.readFileSync(path.join(__dirname, `${cql}.cql`), 'utf8').split(';')
        .map(s => s.trim())
        .filter(s => s);
}

function readJson(json) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, `${json}.json`), 'utf8'));
}

async function getClient() {
    const client = new cassandra.Client({
        contactPoints: [process.env.SCYLLA_HOSTS,],
        authProvider: new cassandra.auth.PlainTextAuthProvider(
            process.env.SCYLLA_USER,
            process.env.SCYLLA_PASSWD
        ),
        localDataCenter: process.env.SCYLLA_DATACENTER,
        encoding: {
            set: Set
        }
    });
    await client.connect();
    return client;
}

async function main() {
    const data = readJson('sampleData');
    const client = await getClient();
    await client.execute('DROP KEYSPACE IF EXISTS leaderboard');

    console.log('Creating keyspace and tables...');
    await buildSchema(client);

    console.log('Inserting Players...');
    await populatePlayers(client, data.players);

    console.log('Inserting Tracks...')
    await populateTracks(client, data.tracks);


    console.log('Populating Submissions...')
    await populateSubmissionsByPlayer(client, data);

    console.log('Done.');
    client.shutdown()
}

async function buildSchema(client) {
    const schemaQueries = readCql('schema');

    for (const query of schemaQueries) {
        await client.execute(query);
    }
}

async function populatePlayers(client, players) {
    const query = 'INSERT INTO leaderboard.players (player_id, name) VALUES (?, ?)';

    for (const player of players) {
        await client.execute(query, player, { prepare: true });
        console.log("New Player: " + player.name)
    }
}

async function populateTracks(client, tracks) {
    const query = 'INSERT INTO leaderboard.tracks (track_id, title, artist, album, cover_url, duration) VALUES (?, ?, ?, ?, ?, ?)';

    for (const track of tracks) {
        await client.execute(query, track, { prepare: true });
        console.log("Inserted Track: " + track.title)
    }
}

async function populateSubmissionsByPlayer(client, data) {
    const submissionQuery = `
    INSERT INTO leaderboard.submissions (
        submission_id, track_id, player_id, modifiers, score, difficulty, instrument, stars, accuracy_percentage, missed_count, ghost_notes_count, max_combo_count, overdrive_count, speed, played_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const leaderboardQuery = `
    INSERT INTO leaderboard.song_leaderboard (
        submission_id, track_id, player_id, modifiers, score, difficulty, instrument, stars, accuracy_percentage, missed_count, ghost_notes_count, max_combo_count, overdrive_count, speed, played_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    let modifiers = new Set();
    modifiers.add('no-modifiers');

    let difficulties = [
        'easy',
        'medium',
        'hard',
        'expert',
        'expert+'
    ];


    for (let player of data.players) {
        for (let difficulty of difficulties) {
            for (let track of data.tracks) {
                let randomScore = Math.floor(Math.random() * (100000 - 50000 + 1) + 50000);
                let randomStars = Math.floor(Math.random() * (5 - 3 + 1) + 3);
                let randomAccuracy = Math.floor(Math.random() * (100 - 90 + 1) + 90);
                let randomDateBetweenPast2Months = new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000);
                let payload = [
                    randomUUID(),
                    track.track_id,
                    player.player_id,
                    modifiers,
                    randomScore,
                    difficulty,
                    'guitar',
                    randomStars,
                    randomAccuracy,
                    0,
                    0,
                    2,
                    10,
                    1,
                    randomDateBetweenPast2Months
                ]
                await client.execute(submissionQuery, payload, { prepare: true });
                await client.execute(leaderboardQuery, payload, { prepare: true });
            }
        }
    }




}


main();