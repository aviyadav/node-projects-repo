import parquet from 'parquetjs';
import fs from 'fs';
import path from 'path';

// Configuration
const TOTAL_RECORDS = 100000;
const START_DATE = new Date('2024-01-01');
const END_DATE = new Date('2026-02-10');
const TENANTS = ['acme', 'globex', 'initech', 'umbrella', 'hooli'];
const PLANS = ['basic', 'premium', 'enterprise', 'starter', 'pro'];

// Helper function to generate random date between start and end
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Helper function to format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Helper function to generate random amount
function randomAmount() {
  return Math.round((Math.random() * 10000 + 100) * 100) / 100; // $100 to $10,100
}

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Generate random records
function generateRecords(count) {
  const records = [];
  
  for (let i = 0; i < count; i++) {
    const tenant = TENANTS[Math.floor(Math.random() * TENANTS.length)];
    const paidAt = randomDate(START_DATE, END_DATE);
    
    records.push({
      tenant_id: tenant,
      plan: PLANS[Math.floor(Math.random() * PLANS.length)],
      amount: randomAmount(),
      paid_at: paidAt.getTime(), // Store as timestamp (milliseconds)
    });
  }
  
  return records;
}

// Group records by tenant and date
function groupRecords(records) {
  const grouped = {};
  
  records.forEach(record => {
    const date = formatDate(new Date(record.paid_at));
    const tenant = record.tenant_id;
    const key = `${tenant}|${date}`;
    
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(record);
  });
  
  return grouped;
}

// Write parquet file
async function writeParquetFile(filePath, records) {
  // Define schema
  const schema = new parquet.ParquetSchema({
    tenant_id: { type: 'UTF8' },
    plan: { type: 'UTF8' },
    amount: { type: 'DOUBLE' },
    paid_at: { type: 'TIMESTAMP_MILLIS' }
  });
  
  // Create writer
  const writer = await parquet.ParquetWriter.openFile(schema, filePath);
  
  // Write records
  for (const record of records) {
    await writer.appendRow(record);
  }
  
  // Close writer
  await writer.close();
}

// Main function
async function main() {
  console.log(`Generating ${TOTAL_RECORDS} random records...`);
  const records = generateRecords(TOTAL_RECORDS);
  
  console.log('Grouping records by tenant and date...');
  const grouped = groupRecords(records);
  
  console.log(`Writing ${Object.keys(grouped).length} parquet files...`);
  
  let fileCount = 0;
  for (const [key, recordsGroup] of Object.entries(grouped)) {
    const [tenant, date] = key.split('|');
    
    // Create directory structure
    const dirPath = path.join('data', 'events', `tenant=${tenant}`, `date=${date}`);
    ensureDirectoryExists(dirPath);
    
    // Create filename with timestamp to make it unique
    const fileName = `events_${Date.now()}_${fileCount}.parquet`;
    const filePath = path.join(dirPath, fileName);
    
    // Write parquet file
    await writeParquetFile(filePath, recordsGroup);
    
    fileCount++;
    if (fileCount % 10 === 0) {
      console.log(`  Wrote ${fileCount} files...`);
    }
  }
  
  console.log(`\n✓ Successfully generated ${TOTAL_RECORDS} records in ${fileCount} parquet files`);
  console.log(`  Date range: ${START_DATE.toISOString().split('T')[0]} to ${END_DATE.toISOString().split('T')[0]}`);
  console.log(`  Tenants: ${TENANTS.join(', ')}`);
  console.log(`  Data directory: ${path.resolve('data')}`);
  
  // Print some statistics
  console.log('\n--- Statistics ---');
  const dates = [...new Set(Object.keys(grouped).map(k => k.split('|')[1]))];
  console.log(`  Unique dates: ${dates.length}`);
  console.log(`  Date range in data: ${dates.sort()[0]} to ${dates.sort()[dates.length - 1]}`);
  console.log(`  Tenants in data: ${TENANTS.join(', ')}`);
}

// Run the program
main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
