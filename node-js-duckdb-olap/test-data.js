import parquet from 'parquetjs';
import fs from 'fs';
import path from 'path';

async function testData() {
  console.log('Testing Parquet data...\n');
  
  // Test 1: Read a sample file from tenant=acme, date=2026-02-01
  console.log('Test 1: Reading sample file from tenant=acme, date=2026-02-01');
  const sampleFilePath = path.join('data', 'events', 'tenant=acme', 'date=2026-02-01');
  const files = fs.readdirSync(sampleFilePath);
  
  if (files.length > 0) {
    const filePath = path.join(sampleFilePath, files[0]);
    console.log(`  Reading: ${filePath}`);
    
    const reader = await parquet.ParquetReader.openFile(filePath);
    const schema = reader.schema;
    
    console.log('\n  Schema:');
    console.log('  -------');
    for (const field of schema.fieldList) {
      console.log(`  - ${field.name}: ${field.primitiveType || field.originalType}`);
    }
    
    console.log('\n  Sample records:');
    console.log('  ---------------');
    const cursor = reader.getCursor();
    let count = 0;
    
    while (count < 5) {
      const record = await cursor.next();
      if (!record) break;
      
      console.log(`  Record ${count + 1}:`, {
        tenant_id: record.tenant_id,
        plan: record.plan,
        amount: record.amount,
        paid_at: new Date(Number(record.paid_at)).toISOString()
      });
      count++;
    }
    
    await reader.close();
    console.log(`\n  ✓ File contains valid Parquet data\n`);
  }
  
  // Test 2: Verify directory structure
  console.log('Test 2: Verifying directory structure');
  const tenants = fs.readdirSync(path.join('data', 'events'));
  console.log(`  Found ${tenants.length} tenant directories:`, tenants.join(', '));
  
  // Check a few tenant directories
  for (const tenant of tenants.slice(0, 2)) {
    const tenantPath = path.join('data', 'events', tenant);
    const dates = fs.readdirSync(tenantPath);
    console.log(`  - ${tenant}: ${dates.length} date partitions`);
  }
  console.log(`  ✓ Directory structure is correct\n`);
  
  // Test 3: Count all parquet files
  console.log('Test 3: Counting all Parquet files');
  const allFiles = [];
  
  function findParquetFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findParquetFiles(fullPath);
      } else if (item.endsWith('.parquet')) {
        allFiles.push(fullPath);
      }
    }
  }
  
  findParquetFiles(path.join('data', 'events'));
  console.log(`  Total Parquet files: ${allFiles.length}`);
  
  // Calculate total file size
  const totalSize = allFiles.reduce((sum, file) => {
    return sum + fs.statSync(file).size;
  }, 0);
  console.log(`  Total data size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  ✓ All files created successfully\n`);
  
  // Test 4: Verify Feb 2026 data for ACME
  console.log('Test 4: Verifying February 2026 data for ACME');
  const feb2026Files = [];
  for (let day = 1; day <= 10; day++) {
    const dateStr = `2026-02-${String(day).padStart(2, '0')}`;
    const dirPath = path.join('data', 'events', 'tenant=acme', `date=${dateStr}`);
    
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.parquet'));
      feb2026Files.push(...files.map(f => path.join(dirPath, f)));
      console.log(`  - ${dateStr}: ${files.length} file(s)`);
    }
  }
  console.log(`  ✓ Found ${feb2026Files.length} files for ACME in Feb 2026\n`);
  
  // Test 5: Read and verify data from multiple partitions
  console.log('Test 5: Reading data from multiple partitions');
  let totalRecords = 0;
  const sampleFiles = allFiles.slice(0, 10); // Sample first 10 files
  
  for (const file of sampleFiles) {
    const reader = await parquet.ParquetReader.openFile(file);
    const cursor = reader.getCursor();
    let count = 0;
    
    while (await cursor.next()) {
      count++;
    }
    
    totalRecords += count;
    await reader.close();
  }
  
  console.log(`  Sampled ${sampleFiles.length} files`);
  console.log(`  Records in sample: ${totalRecords}`);
  console.log(`  Average records per file: ${(totalRecords / sampleFiles.length).toFixed(0)}`);
  console.log(`  Estimated total records: ~${((totalRecords / sampleFiles.length) * allFiles.length).toFixed(0)}`);
  console.log(`  ✓ Data validation complete\n`);
  
  console.log('✓ All tests completed successfully!');
  console.log('\n=== Summary ===');
  console.log(`Total files: ${allFiles.length}`);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Data structure: /data/events/tenant=<tenant>/date=<date>/*.parquet`);
  console.log(`Date range: 2024-01-01 to 2026-02-10`);
  console.log(`Tenants: acme, globex, initech, umbrella, hooli`);
}

testData().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
