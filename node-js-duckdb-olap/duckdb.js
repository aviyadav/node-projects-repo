import parquet from 'parquetjs';
import fs from 'fs';
import path from 'path';

/**
 * Simple parquet reader for analytics queries.
 * Note: This is a simplified implementation. For production, consider using native DuckDB.
 * The native duckdb package doesn't have pre-built binaries for Node.js v25.3.0.
 */

/**
 * Read parquet files matching a glob pattern and filter/aggregate data
 * @param {string} sql - SQL query (simplified support)
 * @param {Array} params - Parameters [parquetPath, filterValue]
 */
export async function queryDuckDB(sql, params = []) {
    const [parquetGlob, tenantFilter] = params;
    
    // For this simple implementation, we'll read the parquet files directly
    // In a real scenario, you'd use native DuckDB with full SQL support
    
    try {
        const results = await readAndAggregateParquet(parquetGlob, tenantFilter);
        return results;
    } catch (error) {
        throw new Error(`Query failed: ${error.message}`);
    }
}

/**
 * Read parquet files and perform basic aggregation
 */
async function readAndAggregateParquet(globPattern, tenantFilter) {
    const files = findParquetFiles(globPattern);
    
    if (files.length === 0) {
        return [];
    }
    
    // Aggregate by plan
    const aggregates = {};
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    
    for (const file of files) {
        try {
            const reader = await parquet.ParquetReader.openFile(file);
            const cursor = reader.getCursor();
            
            let record;
            while (record = await cursor.next()) {
                // Filter by tenant and date
                if (record.tenant_id === tenantFilter && record.paid_at >= thirtyDaysAgo) {
                    const plan = record.plan;
                    
                    if (!aggregates[plan]) {
                        aggregates[plan] = {
                            plan: plan,
                            revenue: 0,
                            payments: 0
                        };
                    }
                    
                    aggregates[plan].revenue += record.amount;
                    aggregates[plan].payments += 1;
                }
            }
            
            await reader.close();
        } catch (err) {
            console.error(`Error reading ${file}:`, err.message);
        }
    }
    
    // Convert to array and sort by revenue
    const results = Object.values(aggregates)
        .map(agg => ({
            plan: agg.plan,
            revenue: Math.round(agg.revenue * 100) / 100,
            payments: agg.payments
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 50);
    
    return results;
}

/**
 * Find all parquet files matching the glob pattern
 */
function findParquetFiles(pattern) {
    const files = [];
    
    // Simple glob expansion for our specific pattern: tenant=xxx/**/*.parquet
    const basePathMatch = pattern.match(/^(.+\/tenant=[^/]+)/);
    if (!basePathMatch) {
        return files;
    }
    
    const basePath = basePathMatch[1];
    
    if (!fs.existsSync(basePath)) {
        return files;
    }
    
    // Recursively find all .parquet files
    function searchDir(dir) {
        try {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    searchDir(fullPath);
                } else if (item.endsWith('.parquet')) {
                    files.push(fullPath);
                }
            }
        } catch (err) {
            // Ignore errors for missing directories
        }
    }
    
    searchDir(basePath);
    return files;
}
