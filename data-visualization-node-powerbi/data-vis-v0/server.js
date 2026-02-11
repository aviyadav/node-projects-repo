const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./data.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS sales_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT,
      category TEXT,
      sales_amount REAL,
      quantity INTEGER,
      date_sold TEXT,
      region TEXT,
      customer_rating INTEGER
    )`);

    db.run(`DELETE FROM sales_data`);

    const sampleData = [
      ['Laptop', 'Electronics', 1200.00, 15, '2024-01-15', 'North', 4],
      ['Phone', 'Electronics', 800.00, 25, '2024-01-16', 'South', 5],
      ['Desk Chair', 'Furniture', 350.00, 8, '2024-01-17', 'East', 3],
      ['Monitor', 'Electronics', 450.00, 12, '2024-01-18', 'West', 4],
      ['Keyboard', 'Electronics', 120.00, 30, '2024-01-19', 'North', 4],
      ['Mouse', 'Electronics', 45.00, 40, '2024-01-20', 'South', 3],
      ['Office Desk', 'Furniture', 600.00, 6, '2024-01-21', 'East', 5],
      ['Tablet', 'Electronics', 650.00, 18, '2024-01-22', 'West', 4],
      ['Headphones', 'Electronics', 180.00, 22, '2024-01-23', 'North', 5],
      ['Webcam', 'Electronics', 95.00, 28, '2024-01-24', 'South', 3],
      ['Bookshelf', 'Furniture', 250.00, 10, '2024-01-25', 'East', 4],
      ['Printer', 'Electronics', 380.00, 7, '2024-01-26', 'West', 2],
      ['Coffee Table', 'Furniture', 280.00, 9, '2024-01-27', 'North', 4],
      ['Smartwatch', 'Electronics', 320.00, 20, '2024-01-28', 'South', 5],
      ['Speaker', 'Electronics', 150.00, 16, '2024-01-29', 'East', 3]
    ];

    const stmt = db.prepare("INSERT INTO sales_data (product_name, category, sales_amount, quantity, date_sold, region, customer_rating) VALUES (?, ?, ?, ?, ?, ?, ?)");
    sampleData.forEach(row => {
      stmt.run(row);
    });
    stmt.finalize();

    console.log('Sample data inserted');
  });
}

app.get('/api/data', (req, res) => {
  const { page = 1, limit = 50, category, region, minSales, maxSales, selectedIds } = req.query;
  const offset = (page - 1) * limit;
  
  let query = 'SELECT * FROM sales_data WHERE 1=1';
  let countQuery = 'SELECT COUNT(*) as total FROM sales_data WHERE 1=1';
  const params = [];
  const countParams = [];

  if (category && category !== 'all') {
    query += ' AND category = ?';
    countQuery += ' AND category = ?';
    params.push(category);
    countParams.push(category);
  }

  if (region && region !== 'all') {
    query += ' AND region = ?';
    countQuery += ' AND region = ?';
    params.push(region);
    countParams.push(region);
  }

  if (minSales) {
    query += ' AND sales_amount >= ?';
    countQuery += ' AND sales_amount >= ?';
    params.push(parseFloat(minSales));
    countParams.push(parseFloat(minSales));
  }

  if (maxSales) {
    query += ' AND sales_amount <= ?';
    countQuery += ' AND sales_amount <= ?';
    params.push(parseFloat(maxSales));
    countParams.push(parseFloat(maxSales));
  }

  if (selectedIds) {
    const ids = selectedIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    if (ids.length > 0) {
      query += ' AND id IN (' + ids.map(() => '?').join(',') + ')';
      params.push(...ids);
      countQuery += ' AND id IN (' + ids.map(() => '?').join(',') + ')';
      countParams.push(...ids);
    }
  }

  query += ' ORDER BY date_sold DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  db.get(countQuery, countParams, (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json({
        data: rows,
        total: countResult.total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(countResult.total / limit)
      });
    });
  });
});

app.get('/api/data/chart', (req, res) => {
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

  if (category && category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (region && region !== 'all') {
    query += ' AND region = ?';
    params.push(region);
  }

  if (checkType === 'high_sales') {
    query += ' AND sales_amount > 500';
  } else if (checkType === 'high_rating') {
    query += ' AND customer_rating >= 4';
  } else if (checkType === 'bulk_orders') {
    query += ' AND quantity > 15';
  }

  query += ' ORDER BY sales_amount DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/checks', (req, res) => {
  const checks = [
    { id: 'all', name: 'All Data', description: 'Show all records' },
    { id: 'high_sales', name: 'High Sales (> $500)', description: 'Products with sales amount greater than $500' },
    { id: 'high_rating', name: 'High Rating (4+ stars)', description: 'Products with customer rating of 4 or higher' },
    { id: 'bulk_orders', name: 'Bulk Orders (> 15 units)', description: 'Orders with quantity greater than 15 units' }
  ];
  res.json(checks);
});

app.get('/api/filters', (req, res) => {
  db.all('SELECT DISTINCT category FROM sales_data', [], (err, categories) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.all('SELECT DISTINCT region FROM sales_data', [], (err, regions) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        categories: categories.map(c => c.category),
        regions: regions.map(r => r.region)
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});