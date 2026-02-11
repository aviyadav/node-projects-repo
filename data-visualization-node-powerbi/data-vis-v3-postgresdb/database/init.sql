-- PostgreSQL Database Initialization Script for Data Visualization Application
-- Run this script to create the database, table, and populate sample data

-- Create the database (run this separately if needed)
-- CREATE DATABASE data_vis;

-- Connect to the data_vis database before running the rest of this script
-- \c data_vis

-- Drop table if exists (for clean re-initialization)
DROP TABLE IF EXISTS sales_data;

-- Create the sales_data table
CREATE TABLE sales_data (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    sales_amount DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    date_sold DATE NOT NULL,
    region VARCHAR(50) NOT NULL,
    customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5)
);

-- Create indexes for better query performance
CREATE INDEX idx_sales_data_category ON sales_data(category);
CREATE INDEX idx_sales_data_region ON sales_data(region);
CREATE INDEX idx_sales_data_date_sold ON sales_data(date_sold);
CREATE INDEX idx_sales_data_sales_amount ON sales_data(sales_amount);

-- Insert sample data
INSERT INTO sales_data (product_name, category, sales_amount, quantity, date_sold, region, customer_rating) VALUES
    ('Laptop', 'Electronics', 1200.00, 15, '2024-01-15', 'North', 4),
    ('Phone', 'Electronics', 800.00, 25, '2024-01-16', 'South', 5),
    ('Desk Chair', 'Furniture', 350.00, 8, '2024-01-17', 'East', 3),
    ('Monitor', 'Electronics', 450.00, 12, '2024-01-18', 'West', 4),
    ('Keyboard', 'Electronics', 120.00, 30, '2024-01-19', 'North', 4),
    ('Mouse', 'Electronics', 45.00, 40, '2024-01-20', 'South', 3),
    ('Office Desk', 'Furniture', 600.00, 6, '2024-01-21', 'East', 5),
    ('Tablet', 'Electronics', 650.00, 18, '2024-01-22', 'West', 4),
    ('Headphones', 'Electronics', 180.00, 22, '2024-01-23', 'North', 5),
    ('Webcam', 'Electronics', 95.00, 28, '2024-01-24', 'South', 3),
    ('Bookshelf', 'Furniture', 250.00, 10, '2024-01-25', 'East', 4),
    ('Printer', 'Electronics', 380.00, 7, '2024-01-26', 'West', 2),
    ('Coffee Table', 'Furniture', 280.00, 9, '2024-01-27', 'North', 4),
    ('Smartwatch', 'Electronics', 320.00, 20, '2024-01-28', 'South', 5),
    ('Speaker', 'Electronics', 150.00, 16, '2024-01-29', 'East', 3),
    ('Gaming Console', 'Electronics', 550.00, 14, '2024-01-30', 'West', 5),
    ('Standing Desk', 'Furniture', 750.00, 5, '2024-01-31', 'North', 4),
    ('USB Cable', 'Electronics', 15.00, 50, '2024-02-01', 'South', 3),
    ('Desk Lamp', 'Furniture', 65.00, 20, '2024-02-02', 'East', 4),
    ('External SSD', 'Electronics', 220.00, 18, '2024-02-03', 'West', 5),
    ('Office Chair Mat', 'Furniture', 85.00, 12, '2024-02-04', 'North', 3),
    ('Wireless Charger', 'Electronics', 40.00, 35, '2024-02-05', 'South', 4),
    ('Filing Cabinet', 'Furniture', 320.00, 7, '2024-02-06', 'East', 4),
    ('Bluetooth Earbuds', 'Electronics', 130.00, 26, '2024-02-07', 'West', 5),
    ('Ergonomic Keyboard', 'Electronics', 95.00, 22, '2024-02-08', 'North', 4),
    ('Sofa', 'Furniture', 1100.00, 3, '2024-02-09', 'South', 5),
    ('Graphics Card', 'Electronics', 890.00, 8, '2024-02-10', 'East', 5),
    ('Dining Table', 'Furniture', 680.00, 4, '2024-02-11', 'West', 4),
    ('Microphone', 'Electronics', 175.00, 15, '2024-02-12', 'North', 4),
    ('Nightstand', 'Furniture', 140.00, 11, '2024-02-13', 'South', 3),
    ('Router', 'Electronics', 125.00, 19, '2024-02-14', 'East', 4),
    ('Wardrobe', 'Furniture', 850.00, 2, '2024-02-15', 'West', 5),
    ('Smart TV', 'Electronics', 1350.00, 9, '2024-02-16', 'North', 5),
    ('Bar Stool', 'Furniture', 95.00, 16, '2024-02-17', 'South', 3),
    ('Laptop Stand', 'Electronics', 55.00, 28, '2024-02-18', 'East', 4),
    ('Recliner', 'Furniture', 720.00, 6, '2024-02-19', 'West', 5),
    ('Mechanical Keyboard', 'Electronics', 165.00, 21, '2024-02-20', 'North', 5),
    ('Ottoman', 'Furniture', 180.00, 10, '2024-02-21', 'South', 4),
    ('Docking Station', 'Electronics', 210.00, 13, '2024-02-22', 'East', 4),
    ('Bed Frame', 'Furniture', 550.00, 5, '2024-02-23', 'West', 4),
    ('Action Camera', 'Electronics', 380.00, 11, '2024-02-24', 'North', 5),
    ('Shoe Rack', 'Furniture', 75.00, 17, '2024-02-25', 'South', 3),
    ('Power Bank', 'Electronics', 50.00, 32, '2024-02-26', 'East', 4),
    ('TV Stand', 'Furniture', 290.00, 8, '2024-02-27', 'West', 4),
    ('Fitness Tracker', 'Electronics', 145.00, 24, '2024-02-28', 'North', 4),
    ('Dresser', 'Furniture', 480.00, 6, '2024-02-29', 'South', 5),
    ('VR Headset', 'Electronics', 620.00, 7, '2024-03-01', 'East', 5),
    ('Accent Chair', 'Furniture', 340.00, 9, '2024-03-02', 'West', 4),
    ('Portable SSD', 'Electronics', 185.00, 20, '2024-03-03', 'North', 4),
    ('Bench', 'Furniture', 210.00, 12, '2024-03-04', 'South', 3),
    ('Smart Speaker', 'Electronics', 110.00, 27, '2024-03-05', 'East', 5),
    ('Coat Rack', 'Furniture', 65.00, 15, '2024-03-06', 'West', 3),
    ('Drone', 'Electronics', 780.00, 6, '2024-03-07', 'North', 5),
    ('Vanity Table', 'Furniture', 420.00, 7, '2024-03-08', 'South', 4),
    ('Gaming Mouse', 'Electronics', 85.00, 29, '2024-03-09', 'East', 5),
    ('Side Table', 'Furniture', 120.00, 14, '2024-03-10', 'West', 4),
    ('Noise Cancelling Headphones', 'Electronics', 295.00, 16, '2024-03-11', 'North', 5),
    ('Storage Cabinet', 'Furniture', 380.00, 8, '2024-03-12', 'South', 4),
    ('E-Reader', 'Electronics', 140.00, 18, '2024-03-13', 'East', 4),
    ('Folding Chair', 'Furniture', 45.00, 25, '2024-03-14', 'West', 3),
    ('Dash Cam', 'Electronics', 95.00, 22, '2024-03-15', 'North', 4),
    ('Bean Bag', 'Furniture', 110.00, 13, '2024-03-16', 'South', 4),
    ('Streaming Webcam', 'Electronics', 165.00, 17, '2024-03-17', 'East', 5),
    ('Magazine Rack', 'Furniture', 55.00, 19, '2024-03-18', 'West', 3),
    ('Portable Monitor', 'Electronics', 285.00, 12, '2024-03-19', 'North', 4),
    ('Futon', 'Furniture', 390.00, 7, '2024-03-20', 'South', 4),
    ('Ring Light', 'Electronics', 75.00, 26, '2024-03-21', 'East', 4),
    ('Bookcase', 'Furniture', 310.00, 9, '2024-03-22', 'West', 4),
    ('Gimbal Stabilizer', 'Electronics', 245.00, 10, '2024-03-23', 'North', 5),
    ('Chaise Lounge', 'Furniture', 580.00, 5, '2024-03-24', 'South', 5),
    ('USB Hub', 'Electronics', 35.00, 38, '2024-03-25', 'East', 4),
    ('Entryway Table', 'Furniture', 260.00, 10, '2024-03-26', 'West', 4),
    ('Projector', 'Electronics', 520.00, 8, '2024-03-27', 'North', 5),
    ('Armchair', 'Furniture', 450.00, 8, '2024-03-28', 'South', 5),
    ('Drawing Tablet', 'Electronics', 340.00, 11, '2024-03-29', 'East', 5),
    ('Console Table', 'Furniture', 295.00, 9, '2024-03-30', 'West', 4),
    ('Smart Doorbell', 'Electronics', 155.00, 20, '2024-03-31', 'North', 4),
    ('Credenza', 'Furniture', 640.00, 4, '2024-04-01', 'South', 5),
    ('Mechanical Mouse', 'Electronics', 70.00, 31, '2024-04-02', 'East', 4),
    ('Loveseat', 'Furniture', 720.00, 5, '2024-04-03', 'West', 5),
    ('Streaming Microphone', 'Electronics', 195.00, 14, '2024-04-04', 'North', 5),
    ('Shelving Unit', 'Furniture', 185.00, 11, '2024-04-05', 'South', 4),
    ('Wireless Mouse', 'Electronics', 32.00, 42, '2024-04-06', 'East', 3),
    ('Sectional Sofa', 'Furniture', 1450.00, 2, '2024-04-07', 'West', 5),
    ('Laptop Bag', 'Accessories', 65.00, 28, '2024-04-08', 'North', 4),
    ('Monitor Arm', 'Electronics', 125.00, 19, '2024-04-09', 'South', 4),
    ('Patio Chair', 'Furniture', 95.00, 16, '2024-04-10', 'East', 3),
    ('Webcam Cover', 'Accessories', 8.00, 60, '2024-04-11', 'West', 3),
    ('Hammock', 'Furniture', 85.00, 14, '2024-04-12', 'North', 4),
    ('Cable Organizer', 'Accessories', 18.00, 45, '2024-04-13', 'South', 4),
    ('Garden Bench', 'Furniture', 240.00, 10, '2024-04-14', 'East', 4),
    ('Phone Case', 'Accessories', 22.00, 55, '2024-04-15', 'West', 3),
    ('Outdoor Table', 'Furniture', 380.00, 7, '2024-04-16', 'North', 4),
    ('Screen Protector', 'Accessories', 12.00, 50, '2024-04-17', 'South', 3),
    ('Adirondack Chair', 'Furniture', 165.00, 12, '2024-04-18', 'East', 4),
    ('Laptop Sleeve', 'Accessories', 28.00, 36, '2024-04-19', 'West', 4),
    ('Patio Set', 'Furniture', 890.00, 3, '2024-04-20', 'North', 5),
    ('Mouse Pad', 'Accessories', 15.00, 48, '2024-04-21', 'South', 3),
    ('Swing Chair', 'Furniture', 275.00, 8, '2024-04-22', 'East', 4),
    ('Keyboard Wrist Rest', 'Accessories', 24.00, 40, '2024-04-23', 'West', 4),
    ('Picnic Table', 'Furniture', 320.00, 6, '2024-04-24', 'North', 4),
    ('Headphone Stand', 'Accessories', 32.00, 34, '2024-04-25', 'South', 4),
    ('Lounge Chair', 'Furniture', 410.00, 7, '2024-04-26', 'East', 5),
    ('Tablet Stand', 'Accessories', 38.00, 30, '2024-04-27', 'West', 4),
    ('Rocking Chair', 'Furniture', 295.00, 9, '2024-04-28', 'North', 5),
    ('Cable Clips', 'Accessories', 10.00, 52, '2024-04-29', 'South', 3),
    ('Deck Chair', 'Furniture', 135.00, 13, '2024-04-30', 'East', 3),
    ('Desk Organizer', 'Accessories', 26.00, 38, '2024-05-01', 'West', 4),
    ('Bistro Set', 'Furniture', 460.00, 6, '2024-05-02', 'North', 4),
    ('Monitor Stand', 'Accessories', 42.00, 32, '2024-05-03', 'South', 4),
    ('Folding Table', 'Furniture', 125.00, 14, '2024-05-04', 'East', 3),
    ('Laptop Cooling Pad', 'Accessories', 35.00, 29, '2024-05-05', 'West', 4);

-- Verify the data was inserted correctly
SELECT 'Total records inserted: ' || COUNT(*) AS result FROM sales_data;
SELECT 'Categories: ' || STRING_AGG(DISTINCT category, ', ') AS result FROM sales_data;
SELECT 'Regions: ' || STRING_AGG(DISTINCT region, ', ') AS result FROM sales_data;
