const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL connection configuration
// Update these values to match your PostgreSQL setup
const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || "data_vis",
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "postgres",
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err);
  } else {
    console.log("Connected to PostgreSQL database");
    release();
  }
});

app.get("/api/data", async (req, res) => {
  const {
    page = 1,
    limit = 50,
    category,
    region,
    minSales,
    maxSales,
    selectedIds,
  } = req.query;
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM sales_data WHERE 1=1";
  let countQuery = "SELECT COUNT(*) as total FROM sales_data WHERE 1=1";
  const params = [];
  const countParams = [];
  let paramIndex = 1;
  let countParamIndex = 1;

  if (category && category !== "all") {
    query += ` AND category = $${paramIndex++}`;
    countQuery += ` AND category = $${countParamIndex++}`;
    params.push(category);
    countParams.push(category);
  }

  if (region && region !== "all") {
    query += ` AND region = $${paramIndex++}`;
    countQuery += ` AND region = $${countParamIndex++}`;
    params.push(region);
    countParams.push(region);
  }

  if (minSales) {
    query += ` AND sales_amount >= $${paramIndex++}`;
    countQuery += ` AND sales_amount >= $${countParamIndex++}`;
    params.push(parseFloat(minSales));
    countParams.push(parseFloat(minSales));
  }

  if (maxSales) {
    query += ` AND sales_amount <= $${paramIndex++}`;
    countQuery += ` AND sales_amount <= $${countParamIndex++}`;
    params.push(parseFloat(maxSales));
    countParams.push(parseFloat(maxSales));
  }

  if (selectedIds) {
    const ids = selectedIds
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
    if (ids.length > 0) {
      const placeholders = ids.map(() => `$${paramIndex++}`).join(",");
      query += ` AND id IN (${placeholders})`;
      params.push(...ids);
      
      const countPlaceholders = ids.map(() => `$${countParamIndex++}`).join(",");
      countQuery += ` AND id IN (${countPlaceholders})`;
      countParams.push(...ids);
    }
  }

  query += ` ORDER BY date_sold DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
  params.push(parseInt(limit), offset);

  try {
    const countResult = await pool.query(countQuery, countParams);
    const dataResult = await pool.query(query, params);

    res.json({
      data: dataResult.rows,
      total: parseInt(countResult.rows[0].total),
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(parseInt(countResult.rows[0].total) / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/data/chart", async (req, res) => {
  const { category, region, checkType } = req.query;

  let query = `
    SELECT
      product_name,
      sales_amount,
      quantity,
      customer_rating,
      category,
      region,
      id
    FROM sales_data
    WHERE 1=1
  `;
  const params = [];
  let paramIndex = 1;

  if (category && category !== "all") {
    query += ` AND category = $${paramIndex++}`;
    params.push(category);
  }

  if (region && region !== "all") {
    query += ` AND region = $${paramIndex++}`;
    params.push(region);
  }

  if (checkType === "high_sales") {
    query += " AND sales_amount > 500";
  } else if (checkType === "high_rating") {
    query += " AND customer_rating >= 4";
  } else if (checkType === "bulk_orders") {
    query += " AND quantity > 15";
  }

  query += " ORDER BY sales_amount DESC";

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/checks", (req, res) => {
  const checks = [
    { id: "all", name: "All Data", description: "Show all records" },
    {
      id: "high_sales",
      name: "High Sales (> $500)",
      description: "Products with sales amount greater than $500",
    },
    {
      id: "high_rating",
      name: "High Rating (4+ stars)",
      description: "Products with customer rating of 4 or higher",
    },
    {
      id: "bulk_orders",
      name: "Bulk Orders (> 15 units)",
      description: "Orders with quantity greater than 15 units",
    },
  ];
  res.json(checks);
});

app.get("/api/filters", async (req, res) => {
  try {
    const categoriesResult = await pool.query("SELECT DISTINCT category FROM sales_data");
    const regionsResult = await pool.query("SELECT DISTINCT region FROM sales_data");

    res.json({
      categories: categoriesResult.rows.map((c) => c.category),
      regions: regionsResult.rows.map((r) => r.region),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
