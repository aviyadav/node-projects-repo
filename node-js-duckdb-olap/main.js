import express from 'express';
import { queryDuckDB } from './duckdb.js';

const app = express();

app.get('/api/analytics/revenue-by-plan', async (req, res) => {
    const tenant = req.query.tenant;
    if (!tenant) return res.status(400).json({ error: 'Missing tenant parameter' });

    const sql = `
        SELECT 
            plan, 
            SUM(amount) AS revenue,
            COUNT(*) AS payments
        FROM read_parquet(?)
        WHERE tenant_id = ?
            AND paid_at >= now() - INTERVAL '30 days'
        GROUP BY plan
        ORDER BY revenue DESC
        LIMIT 50
    `;

    // Partitioned parquet path pattern for the tenant (simplified)
    const parquetGlob = `data/events/tenant=${tenant}/**/*.parquet`;

    try {
        const rows = await queryDuckDB(sql, [parquetGlob, tenant]);
        res.json({ tenant, data: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
