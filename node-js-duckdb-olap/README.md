# Node.js DuckDB OLAP Project

A Node.js project for generating partitioned Parquet data and performing OLAP queries with DuckDB.

## Prerequisites

- Node.js (tested with v25.3.0)
- npm

## Installation

Install all required dependencies:

```bash
npm install
```

This will install:
- `@duckdb/duckdb-wasm` - DuckDB WebAssembly for OLAP queries
- `parquetjs` - Library for reading/writing Parquet files

## Commands

### Generate Random Data

Generate 1,000,000 random event records with partitioned Parquet files using parallel processing:

```bash
node generate-data.js
```

**What it does:**
- Creates 1,000,000 records with random data using worker threads
- Uses all available CPU cores for parallel processing
- Partitions data by tenant and date
- Date range: 2024-01-01 to 2026-02-10
- Tenants: acme, globex, initech, umbrella, hooli
- Plans: basic, premium, enterprise, starter, pro
- Output: `data/events/tenant=<name>/date=<YYYY-MM-DD>/*.parquet`

**P92,000 Parquet files
- ~75 MB total size
- Files organized in Hive-style partitioning
- Multiple files per partition (one from each worker thread)re systems
- ~22-30 seconds for 1 million records (depending on CPU)

**Expected output:**
- ~3,855 Parquet files
- ~5-6 MB total size
- Files organized in Hive-style partitioning

### Test Generated Data

Validate the generated Parquet files:

```bash
node test-data.js
```

**What it does:**
- Reads sample Parquet files
- Verifies directory structure
- Counts total files
- Validates schema and data types
- Shows sample records

## Project Structure

```
node-js-duckdb-olap/
├── package.json              # Project dependencies
├── generate-data.js          # Data generation script
├── test-data.js             # Data validation script
├── README.md                # This file
└── data/                    # Generated data (after running generate-data.js)
    └── events/
        ├── tenant=acme/
        │   ├── date=2024-01-01/
        │   │   └── events_*.parquet
        │   ├── date=2024-01-02/
        │   │   └── events_*.parquet
        │   └── ...
        ├── tenant=globex/
        ├── tenant=hooli/
        ├── tenant=initech/
        └── tenant=umbrella/
```

## Data Schema

Each Parquet file contains the following columns:

| Column    | Type              | Description                    |
|-----------|-------------------|--------------------------------|
| tenant_id | STRING            | Tenant identifier              |
| plan      | STRING            | Subscription plan type         |
| amount    | DOUBLE            | Payment amount ($100-$10,100)  |
| paid_at   | TIMESTAMP_MILLIS  | Payment timestamp              |

## Quick Start

Run these commands to get started:

```bash
# 1. Install dependencies
npm install

# 2. Generate sample data
node generate-data.js

# 3. Validate the data
node test-data.js
```

## Example Queries (Future)

Once you have the data generated, you can query it using DuckDB:

```javascript
// Example: Count records by tenant
SELECT tenant_id, COUNT(*) as record_count 
FROM read_parquet('data/events/**/*.parquet')
GROUP BY tenant_id;

// Example: Query specific tenant and date range
SELECT * 
FROM read_parquet('data/events/tenant=acme/date=2026-02-*/*.parquet')
LIMIT 10;

// Example: Calculate revenue by plan
SELECT plan, SUM(amount) as total_revenue
FROM read_parquet('data/events/**/*.parquet')
GROUP BY plan
ORDER BY total_revenue DESC;
```

## Data Characteristics
,000,000
- **Date Range:** January 1, 2024 - February 10, 2026
- **Tenants:** 5 (acme, globex, initech, umbrella, hooli)
- **Plans:** 5 (basic, premium, enterprise, starter, pro)
- **Partition Strategy:** Hive-style partitioning by tenant and date
- **File Format:** Apache Parquet (columnar storage)
- **Generation Method:** Parallel processing with worker threads

## Performance Features

- **Multi-threaded Data Generation:** Uses Node.js worker threads to parallelize data generation
- **CPU Core Utilization:** Automatically detects and uses all available CPU cores
- **Scalable:** Can easily generate millions of records in seconds
- **Progress Reporting:** Real-time progress updates during generation tenant and date
- **File Format:** Apache Parquet (columnar storage)

## Notes

- The project uses DuckDB WASM version because Node.js v25.3.0 doesn't have pre-built native binaries
- Data is generated with random values for testing OLAP queries
- Partition pruning can be used for efficient queries by tenant and/or date
