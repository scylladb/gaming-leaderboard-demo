const cassandra = require('cassandra-driver');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

function readCql(cql) {
    return fs.readFileSync(path.join(__dirname, `${cql}.cql`), 'utf8').split(';')
        .map(s => s.trim())
        .filter(s => s);
}

function readCSV(filepath) {
    return fs.readFileSync(path.join(__dirname, filepath), 'utf8').split('\n')
}

async function getClient() {
    const client = new cassandra.Client({
        contactPoints: [process.env.SCYLLA_HOSTS,],
        authProvider: new cassandra.auth.PlainTextAuthProvider(
            process.env.SCYLLA_USER,
            process.env.SCYLLA_PASSWD
        ),
        localDataCenter: process.env.SCYLLA_DATACENTER
    });
    await client.connect();
    return client;
}

async function main() {
    const client = await getClient();

    await client.execute('DROP KEYSPACE IF EXISTS streaming');

    const SCHEMA = readCql('schema');

    console.log('Creating keyspace and tables...');
    for (const query of SCHEMA) {
        await client.execute(query);
    }

    console.log('Inserting sample data...');

    const SAMPLE = readCSV("sample_data.csv")
    const query = `INSERT INTO streaming.video (id,created_at,content_type,thumbnail,title,url,duration)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`
    for (const row of SAMPLE) {
        const values = row.split(",")
        if (values.length > 1) {
            await client.execute(query, values, { prepare: true });
        }
    }

    console.log('Done.');
    client.shutdown()
}


main();