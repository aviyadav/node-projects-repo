import { parentPort, workerData } from 'worker_threads';
import parquet from 'parquetjs';
import fs from 'fs';
import path from 'path';

const { recordCount, startIndex, config } = workerData;

// Helper functions
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function randomAmount() {
  return Math.round((Math.random() * 10000 + 100) * 100) / 100;
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Generate random records
function generateRecords(count, startIdx) {
  const records = [];
  const START_DATE = new Date(config.START_DATE);
  const END_DATE = new Date(config.END_DATE);
  
  for (let i = 0; i < count; i++) {
    const tenant = config.TENANTS[Math.floor(Math.random() * config.TENANTS.length)];
    const paidAt = randomDate(START_DATE, END_DATE);
    
    records.push({
      tenant_id: tenant,
      plan: config.PLANS[Math.floor(Math.random() * config.PLANS.length)],
      amount: randomAmount(),
      paid_at: paidAt.getTime(),
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
  const schema = new parquet.ParquetSchema({
    tenant_id: { type: 'UTF8' },
    plan: { type: 'UTF8' },
    amount: { type: 'DOUBLE' },
    paid_at: { type: 'TIMESTAMP_MILLIS' }
  });
  
  const writer = await parquet.ParquetWriter.openFile(schema, filePath);
  
  for (const record of records) {
    await writer.appendRow(record);
  }
  
  await writer.close();
}

// Worker main process
async function processChunk() {
  try {
    // Generate records
    const records = generateRecords(recordCount, startIndex);
    
    // Group by tenant and date
    const grouped = groupRecords(records);
    
    // Write parquet files
    let fileCount = 0;
    for (const [key, recordsGroup] of Object.entries(grouped)) {
      const [tenant, date] = key.split('|');
      
      const dirPath = path.join('data', 'events', `tenant=${tenant}`, `date=${date}`);
      ensureDirectoryExists(dirPath);
      
      const fileName = `events_${Date.now()}_${startIndex}_${fileCount}.parquet`;
      const filePath = path.join(dirPath, fileName);
      
      await writeParquetFile(filePath, recordsGroup);
      fileCount++;
    }
    
    parentPort.postMessage({
      success: true,
      recordsProcessed: recordCount,
      filesWritten: fileCount
    });
  } catch (error) {
    parentPort.postMessage({
      success: false,
      error: error.message
    });
  }
}

processChunk();
