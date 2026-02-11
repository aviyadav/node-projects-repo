import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TOTAL_RECORDS = 1000000;
const START_DATE = new Date('2024-01-01');
const END_DATE = new Date('2026-02-10');
const TENANTS = ['acme', 'globex', 'initech', 'umbrella', 'hooli'];
const PLANS = ['basic', 'premium', 'enterprise', 'starter', 'pro'];
const NUM_WORKERS = cpus().length; // Use all available CPU cores

// Create a worker to process a chunk of records
function createWorker(recordCount, startIndex, config) {
  return new Promise((resolve, reject) => {
    const workerPath = path.join(__dirname, 'generate-data-worker.js');
    const worker = new Worker(workerPath, {
      workerData: {
        recordCount,
        startIndex,
        config: {
          START_DATE: config.START_DATE.toISOString(),
          END_DATE: config.END_DATE.toISOString(),
          TENANTS: config.TENANTS,
          PLANS: config.PLANS
        }
      }
    });

    worker.on('message', (message) => {
      if (message.success) {
        resolve(message);
      } else {
        reject(new Error(message.error));
      }
    });

    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

// Main function using parallel processing
async function main() {
  const startTime = Date.now();
  
  console.log(`Generating ${TOTAL_RECORDS.toLocaleString()} random records using ${NUM_WORKERS} workers...`);
  console.log(`Workers: ${NUM_WORKERS} (CPU cores available)`);
  
  // Calculate records per worker
  const recordsPerWorker = Math.ceil(TOTAL_RECORDS / NUM_WORKERS);
  
  // Create workers
  const workers = [];
  for (let i = 0; i < NUM_WORKERS; i++) {
    const startIndex = i * recordsPerWorker;
    const recordCount = Math.min(recordsPerWorker, TOTAL_RECORDS - startIndex);
    
    if (recordCount > 0) {
      console.log(`  Starting worker ${i + 1}: ${recordCount.toLocaleString()} records (index ${startIndex.toLocaleString()})`);
      workers.push(
        createWorker(recordCount, startIndex, {
          START_DATE,
          END_DATE,
          TENANTS,
          PLANS
        })
      );
    }
  }
  
  // Wait for all workers to complete
  console.log('\nProcessing...');
  const results = await Promise.all(workers);
  
  // Aggregate results
  const totalRecordsProcessed = results.reduce((sum, r) => sum + r.recordsProcessed, 0);
  const totalFilesWritten = results.reduce((sum, r) => sum + r.filesWritten, 0);
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log(`\n✓ Successfully generated ${totalRecordsProcessed.toLocaleString()} records in ${totalFilesWritten.toLocaleString()} parquet files`);
  console.log(`  Time taken: ${duration} seconds`);
  console.log(`  Speed: ${Math.round(totalRecordsProcessed / duration).toLocaleString()} records/second`);
  console.log(`  Date range: ${START_DATE.toISOString().split('T')[0]} to ${END_DATE.toISOString().split('T')[0]}`);
  console.log(`  Tenants: ${TENANTS.join(', ')}`);
  console.log(`  Plans: ${PLANS.join(', ')}`);
  console.log(`  Data directory: ${path.resolve('data')}`);
  
  console.log('\n--- Performance Summary ---');
  console.log(`  Workers used: ${NUM_WORKERS}`);
  console.log(`  Records per worker: ~${recordsPerWorker.toLocaleString()}`);
  console.log(`  Average files per worker: ${Math.round(totalFilesWritten / NUM_WORKERS)}`);
}

// Run the program
main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});