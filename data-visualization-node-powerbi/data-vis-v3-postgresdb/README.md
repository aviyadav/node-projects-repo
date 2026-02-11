# Data Visualization Prototype

A full-stack Node.js and React application that displays database data in an interactive dashboard with tabular views and dynamic visualizations.

## Features

- **Interactive Data Table**: Paginated table with sortable columns and filtering
- **Dynamic Chart Visualizations**: Four chart types displayed simultaneously (Scatter, Bar, Line, Pie)
- **Check Criteria System**: Pre-defined filters for data analysis (High Sales, High Ratings, Bulk Orders)
- **Bidirectional Filtering**: Select points in chart to filter table, or use filters to update chart
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Immediate visual feedback on user interactions

## Architecture

- **Backend**: Node.js with Express and PostgreSQL database
- **Frontend**: React with styled-components and Recharts for visualizations
- **API**: RESTful endpoints for data retrieval and filtering

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm
- PostgreSQL (v12 or higher)

### Database Setup

1. **Create the PostgreSQL database:**
   ```bash
   # Connect to PostgreSQL as admin
   psql -U postgres
   
   # Create the database
   CREATE DATABASE data_vis;
   
   # Exit psql
   \q
   ```

2. **Initialize the database with sample data:**
   ```bash
   psql -U postgres -d data_vis -f database/init.sql
   ```

3. **Configure environment variables:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your PostgreSQL credentials
   ```

### Installation

1. **Install backend dependencies:**
   ```bash
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Start the application:**
   
   Option 1: Start both servers in separate terminals
   ```bash
   # Terminal 1 - Backend
   npm start
   
   # Terminal 2 - Frontend  
   cd client
   npm start
   ```
   
   Option 2: Use the setup script
   ```bash
   npm run setup
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Usage

### Data Checks
Select from pre-defined criteria to filter the dataset:
- **All Data**: Show all records
- **High Sales**: Products with sales amount > $500
- **High Rating**: Products with customer rating ≥ 4 stars
- **Bulk Orders**: Orders with quantity > 15 units

### Interactive Charts
- **Four chart types displayed simultaneously**:
  - **Scatter Plot**: Sales vs Quantity with interactive point selection
  - **Bar Chart**: Sales by Product with clickable bars
  - **Line Chart**: Sales Over Time with trend visualization
  - **Pie Chart**: Sales by Category (summary view)
- Click on data points in Scatter, Bar, or Line charts to select/deselect them
- Selected points appear in red across all interactive charts and filter the table
- Clear Selection button removes all selections at once

### Filters
- **Category**: Filter by product category
- **Region**: Filter by geographic region
- **Sales Range**: Set minimum and maximum sales amounts

### Table Features
- Pagination with configurable page size
- Formatted currency and date display
- Star ratings with color coding
- Hover effects for better UX

## API Endpoints

- `GET /api/data` - Fetch paginated data with filters
- `GET /api/data/chart` - Fetch data for chart visualization
- `GET /api/checks` - Get available data check criteria
- `GET /api/filters` - Get available filter options (categories, regions)

## Database Schema

The application uses a single `sales_data` table with the following structure:
- `id` (Primary Key)
- `product_name` (Text)
- `category` (Text)
- `sales_amount` (Real)
- `quantity` (Integer)
- `date_sold` (Text)
- `region` (Text)
- `customer_rating` (Integer, 1-5)

## Sample Data

The application automatically populates with 15 sample records including:
- Products: Laptops, Phones, Furniture, Electronics
- Categories: Electronics, Furniture
- Regions: North, South, East, West
- Sales amounts: $45 - $1,200
- Customer ratings: 2-5 stars

## Development

### Project Structure
```
data-vis/
├── server.js              # Backend server
├── package.json           # Backend dependencies
├── data.db               # SQLite database (auto-created)
└── client/
    ├── src/
    │   ├── components/   # React components
    │   ├── App.js       # Main application
    │   └── index.js     # Entry point
    └── package.json     # Frontend dependencies
```

### Key Components
- **DataTable**: Paginated table with formatting and pagination
- **ChartVisualization**: Interactive scatter chart with selection
- **CheckSelector**: Radio buttons for data criteria selection
- **FilterPanel**: Dropdown and input controls for filtering

### Technologies Used
- **Backend**: Express.js, SQLite3, CORS
- **Frontend**: React, styled-components, Recharts
- **Build**: Create React App (for development convenience)

## Troubleshooting

### Port Conflicts
- If port 3001 is in use, modify `server.js` to use a different port
- If port 3000 is in use, React will automatically use the next available port

### Database Issues
- The SQLite database (`data.db`) is created automatically on first run
- Delete `data.db` to reset to initial sample data

### Development Mode
- Use `npm run dev` for the backend (requires nodemon)
- Use `npm start` in the client directory for React dev server

## Extensions

This prototype can be extended with:
- Additional chart types (bar charts, line charts, heatmaps)
- Real-time data updates with WebSockets
- Export functionality (CSV, PDF)
- User authentication and data permissions
- Advanced filtering and search capabilities
- Data aggregation and summary statistics