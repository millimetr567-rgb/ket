const { Client } = require('pg');

async function testConnection(password) {
  const user = 'postgres.dafglnazvucrblfchljx';
  const host = 'db.dafglnazvucrblfchljx.supabase.co';
  
  // Try port 5432 (direct IPv6)
  const uri = `postgresql://${user}:${encodeURIComponent(password)}@${host}:5432/postgres?sslmode=require`;
  
  console.log(`Testing password: "${password}" on direct URL`);
  const client = new Client({ connectionString: uri, connectionTimeoutMillis: 5000 });
  
  try {
    await client.connect();
    console.log(`SUCCESS! Connected with password: ${password}`);
    await client.end();
    return true;
  } catch (e) {
    console.error(`Failed: ${e.message}`);
    return false;
  }
}

async function run() {
  const passwordsToTest = [
    'Sheykh7927$',
    '[Sheykh7927$]',
    'Sheykh7927',
    'postgres'
  ];
  
  for (const p of passwordsToTest) {
    const success = await testConnection(p);
    if (success) break;
  }
}

run();
