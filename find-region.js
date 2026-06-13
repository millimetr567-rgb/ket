const { Client } = require('pg');

const regions = [
  'us-east-1', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-central-1',
  'ap-southeast-1', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1',
  'ca-central-1', 'sa-east-1'
];

async function testRegions() {
  const password = 'Sheykh7927$';
  const user = 'postgres.dafglnazvucrblfchljx';

  for (const region of regions) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    const uri = `postgresql://${user}:${encodeURIComponent(password)}@${host}:6543/postgres?sslmode=require`;
    
    console.log(`Testing ${host}...`);
    const client = new Client({ connectionString: uri, connectionTimeoutMillis: 3000 });
    
    try {
      await client.connect();
      console.log(`SUCCESS! Found region: ${region}`);
      console.log(`URL: ${uri}`);
      await client.end();
      return uri;
    } catch (e) {
      // console.error(`Failed ${region}: ${e.message}`);
    }
  }
  console.log('Could not find region.');
}

testRegions();
