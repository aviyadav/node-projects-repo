const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./data.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database");
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
      ["Laptop", "Electronics", 1200.0, 15, "2024-01-15", "North", 4],
      ["Phone", "Electronics", 800.0, 25, "2024-01-16", "South", 5],
      ["Desk Chair", "Furniture", 350.0, 8, "2024-01-17", "East", 3],
      ["Monitor", "Electronics", 450.0, 12, "2024-01-18", "West", 4],
      ["Keyboard", "Electronics", 120.0, 30, "2024-01-19", "North", 4],
      ["Mouse", "Electronics", 45.0, 40, "2024-01-20", "South", 3],
      ["Office Desk", "Furniture", 600.0, 6, "2024-01-21", "East", 5],
      ["Tablet", "Electronics", 650.0, 18, "2024-01-22", "West", 4],
      ["Headphones", "Electronics", 180.0, 22, "2024-01-23", "North", 5],
      ["Webcam", "Electronics", 95.0, 28, "2024-01-24", "South", 3],
      ["Bookshelf", "Furniture", 250.0, 10, "2024-01-25", "East", 4],
      ["Printer", "Electronics", 380.0, 7, "2024-01-26", "West", 2],
      ["Coffee Table", "Furniture", 280.0, 9, "2024-01-27", "North", 4],
      ["Smartwatch", "Electronics", 320.0, 20, "2024-01-28", "South", 5],
      ["Speaker", "Electronics", 150.0, 16, "2024-01-29", "East", 3],
      ["Gaming Console", "Electronics", 550.0, 14, "2024-01-30", "West", 5],
      ["Standing Desk", "Furniture", 750.0, 5, "2024-01-31", "North", 4],
      ["USB Cable", "Electronics", 15.0, 50, "2024-02-01", "South", 3],
      ["Desk Lamp", "Furniture", 65.0, 20, "2024-02-02", "East", 4],
      ["External SSD", "Electronics", 220.0, 18, "2024-02-03", "West", 5],
      ["Office Chair Mat", "Furniture", 85.0, 12, "2024-02-04", "North", 3],
      ["Wireless Charger", "Electronics", 40.0, 35, "2024-02-05", "South", 4],
      ["Filing Cabinet", "Furniture", 320.0, 7, "2024-02-06", "East", 4],
      ["Bluetooth Earbuds", "Electronics", 130.0, 26, "2024-02-07", "West", 5],
      ["Ergonomic Keyboard", "Electronics", 95.0, 22, "2024-02-08", "North", 4],
      ["Sofa", "Furniture", 1100.0, 3, "2024-02-09", "South", 5],
      ["Graphics Card", "Electronics", 890.0, 8, "2024-02-10", "East", 5],
      ["Dining Table", "Furniture", 680.0, 4, "2024-02-11", "West", 4],
      ["Microphone", "Electronics", 175.0, 15, "2024-02-12", "North", 4],
      ["Nightstand", "Furniture", 140.0, 11, "2024-02-13", "South", 3],
      ["Router", "Electronics", 125.0, 19, "2024-02-14", "East", 4],
      ["Wardrobe", "Furniture", 850.0, 2, "2024-02-15", "West", 5],
      ["Smart TV", "Electronics", 1350.0, 9, "2024-02-16", "North", 5],
      ["Bar Stool", "Furniture", 95.0, 16, "2024-02-17", "South", 3],
      ["Laptop Stand", "Electronics", 55.0, 28, "2024-02-18", "East", 4],
      ["Recliner", "Furniture", 720.0, 6, "2024-02-19", "West", 5],
      ["Mechanical Keyboard", "Electronics", 165.0, 21, "2024-02-20", "North", 5],
      ["Ottoman", "Furniture", 180.0, 10, "2024-02-21", "South", 4],
      ["Docking Station", "Electronics", 210.0, 13, "2024-02-22", "East", 4],
      ["Bed Frame", "Furniture", 550.0, 5, "2024-02-23", "West", 4],
      ["Action Camera", "Electronics", 380.0, 11, "2024-02-24", "North", 5],
      ["Shoe Rack", "Furniture", 75.0, 17, "2024-02-25", "South", 3],
      ["Power Bank", "Electronics", 50.0, 32, "2024-02-26", "East", 4],
      ["TV Stand", "Furniture", 290.0, 8, "2024-02-27", "West", 4],
      ["Fitness Tracker", "Electronics", 145.0, 24, "2024-02-28", "North", 4],
      ["Dresser", "Furniture", 480.0, 6, "2024-02-29", "South", 5],
      ["VR Headset", "Electronics", 620.0, 7, "2024-03-01", "East", 5],
      ["Accent Chair", "Furniture", 340.0, 9, "2024-03-02", "West", 4],
      ["Portable SSD", "Electronics", 185.0, 20, "2024-03-03", "North", 4],
      ["Bench", "Furniture", 210.0, 12, "2024-03-04", "South", 3],
      ["Smart Speaker", "Electronics", 110.0, 27, "2024-03-05", "East", 5],
      ["Coat Rack", "Furniture", 65.0, 15, "2024-03-06", "West", 3],
      ["Drone", "Electronics", 780.0, 6, "2024-03-07", "North", 5],
      ["Vanity Table", "Furniture", 420.0, 7, "2024-03-08", "South", 4],
      ["Gaming Mouse", "Electronics", 85.0, 29, "2024-03-09", "East", 5],
      ["Side Table", "Furniture", 120.0, 14, "2024-03-10", "West", 4],
      ["Noise Cancelling Headphones", "Electronics", 295.0, 16, "2024-03-11", "North", 5],
      ["Storage Cabinet", "Furniture", 380.0, 8, "2024-03-12", "South", 4],
      ["E-Reader", "Electronics", 140.0, 18, "2024-03-13", "East", 4],
      ["Folding Chair", "Furniture", 45.0, 25, "2024-03-14", "West", 3],
      ["Dash Cam", "Electronics", 95.0, 22, "2024-03-15", "North", 4],
      ["Bean Bag", "Furniture", 110.0, 13, "2024-03-16", "South", 4],
      ["Streaming Webcam", "Electronics", 165.0, 17, "2024-03-17", "East", 5],
      ["Magazine Rack", "Furniture", 55.0, 19, "2024-03-18", "West", 3],
      ["Portable Monitor", "Electronics", 285.0, 12, "2024-03-19", "North", 4],
      ["Futon", "Furniture", 390.0, 7, "2024-03-20", "South", 4],
      ["Ring Light", "Electronics", 75.0, 26, "2024-03-21", "East", 4],
      ["Bookcase", "Furniture", 310.0, 9, "2024-03-22", "West", 4],
      ["Gimbal Stabilizer", "Electronics", 245.0, 10, "2024-03-23", "North", 5],
      ["Chaise Lounge", "Furniture", 580.0, 5, "2024-03-24", "South", 5],
      ["USB Hub", "Electronics", 35.0, 38, "2024-03-25", "East", 4],
      ["Entryway Table", "Furniture", 260.0, 10, "2024-03-26", "West", 4],
      ["Projector", "Electronics", 520.0, 8, "2024-03-27", "North", 5],
      ["Armchair", "Furniture", 450.0, 8, "2024-03-28", "South", 5],
      ["Drawing Tablet", "Electronics", 340.0, 11, "2024-03-29", "East", 5],
      ["Console Table", "Furniture", 295.0, 9, "2024-03-30", "West", 4],
      ["Smart Doorbell", "Electronics", 155.0, 20, "2024-03-31", "North", 4],
      ["Credenza", "Furniture", 640.0, 4, "2024-04-01", "South", 5],
      ["Mechanical Mouse", "Electronics", 70.0, 31, "2024-04-02", "East", 4],
      ["Loveseat", "Furniture", 720.0, 5, "2024-04-03", "West", 5],
      ["Streaming Microphone", "Electronics", 195.0, 14, "2024-04-04", "North", 5],
      ["Shelving Unit", "Furniture", 185.0, 11, "2024-04-05", "South", 4],
      ["Wireless Mouse", "Electronics", 32.0, 42, "2024-04-06", "East", 3],
      ["Sectional Sofa", "Furniture", 1450.0, 2, "2024-04-07", "West", 5],
      ["Laptop Bag", "Accessories", 65.0, 28, "2024-04-08", "North", 4],
      ["Monitor Arm", "Electronics", 125.0, 19, "2024-04-09", "South", 4],
      ["Patio Chair", "Furniture", 95.0, 16, "2024-04-10", "East", 3],
      ["Webcam Cover", "Accessories", 8.0, 60, "2024-04-11", "West", 3],
      ["Hammock", "Furniture", 85.0, 14, "2024-04-12", "North", 4],
      ["Cable Organizer", "Accessories", 18.0, 45, "2024-04-13", "South", 4],
      ["Garden Bench", "Furniture", 240.0, 10, "2024-04-14", "East", 4],
      ["Phone Case", "Accessories", 22.0, 55, "2024-04-15", "West", 3],
      ["Outdoor Table", "Furniture", 380.0, 7, "2024-04-16", "North", 4],
      ["Screen Protector", "Accessories", 12.0, 50, "2024-04-17", "South", 3],
      ["Adirondack Chair", "Furniture", 165.0, 12, "2024-04-18", "East", 4],
      ["Laptop Sleeve", "Accessories", 28.0, 36, "2024-04-19", "West", 4],
      ["Patio Set", "Furniture", 890.0, 3, "2024-04-20", "North", 5],
      ["Mouse Pad", "Accessories", 15.0, 48, "2024-04-21", "South", 3],
      ["Swing Chair", "Furniture", 275.0, 8, "2024-04-22", "East", 4],
      ["Keyboard Wrist Rest", "Accessories", 24.0, 40, "2024-04-23", "West", 4],
      ["Picnic Table", "Furniture", 320.0, 6, "2024-04-24", "North", 4],
      ["Headphone Stand", "Accessories", 32.0, 34, "2024-04-25", "South", 4],
      ["Lounge Chair", "Furniture", 410.0, 7, "2024-04-26", "East", 5],
      ["Tablet Stand", "Accessories", 38.0, 30, "2024-04-27", "West", 4],
      ["Rocking Chair", "Furniture", 295.0, 9, "2024-04-28", "North", 5],
      ["Cable Clips", "Accessories", 10.0, 52, "2024-04-29", "South", 3],
      ["Deck Chair", "Furniture", 135.0, 13, "2024-04-30", "East", 3],
      ["Desk Organizer", "Accessories", 26.0, 38, "2024-05-01", "West", 4],
      ["Bistro Set", "Furniture", 460.0, 6, "2024-05-02", "North", 4],
      ["Monitor Stand", "Accessories", 42.0, 32, "2024-05-03", "South", 4],
      ["Folding Table", "Furniture", 125.0, 14, "2024-05-04", "East", 3],
      ["Laptop Cooling Pad", "Accessories", 35.0, 29, "2024-05-05", "West", 4]
    ];

    const stmt = db.prepare(
      "INSERT INTO sales_data (product_name, category, sales_amount, quantity, date_sold, region, customer_rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
    );
    sampleData.forEach((row) => {
      stmt.run(row);
    });
    stmt.finalize();

    console.log("Sample data inserted");
  });
}

app.get("/api/data", (req, res) => {
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

  if (category && category !== "all") {
    query += " AND category = ?";
    countQuery += " AND category = ?";
    params.push(category);
    countParams.push(category);
  }

  if (region && region !== "all") {
    query += " AND region = ?";
    countQuery += " AND region = ?";
    params.push(region);
    countParams.push(region);
  }

  if (minSales) {
    query += " AND sales_amount >= ?";
    countQuery += " AND sales_amount >= ?";
    params.push(parseFloat(minSales));
    countParams.push(parseFloat(minSales));
  }

  if (maxSales) {
    query += " AND sales_amount <= ?";
    countQuery += " AND sales_amount <= ?";
    params.push(parseFloat(maxSales));
    countParams.push(parseFloat(maxSales));
  }

  if (selectedIds) {
    const ids = selectedIds
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
    if (ids.length > 0) {
      query += " AND id IN (" + ids.map(() => "?").join(",") + ")";
      params.push(...ids);
      countQuery += " AND id IN (" + ids.map(() => "?").join(",") + ")";
      countParams.push(...ids);
    }
  }

  query += " ORDER BY date_sold DESC LIMIT ? OFFSET ?";
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
        totalPages: Math.ceil(countResult.total / limit),
      });
    });
  });
});

app.get("/api/data/chart", (req, res) => {
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

  if (category && category !== "all") {
    query += " AND category = ?";
    params.push(category);
  }

  if (region && region !== "all") {
    query += " AND region = ?";
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

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
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

app.get("/api/filters", (req, res) => {
  db.all("SELECT DISTINCT category FROM sales_data", [], (err, categories) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.all("SELECT DISTINCT region FROM sales_data", [], (err, regions) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        categories: categories.map((c) => c.category),
        regions: regions.map((r) => r.region),
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
