import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';

const ChartsGrid = styled.div`
  display: flex;
  gap: 15px;
  margin: 20px 0;
  overflow-x: auto;
  padding-bottom: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ChartContainer = styled.div`
  min-width: 300px;
  width: 300px;
  height: 250px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    height: 300px;
  }
`;

const ChartTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #2d3748;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
`;

const CustomTooltip = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TooltipRow = styled.div`
  margin: 4px 0;
  font-size: 0.9rem;
`;

const TooltipLabel = styled.span`
  font-weight: 600;
  color: #4a5568;
`;

const TooltipValue = styled.span`
  color: #2d3748;
  margin-left: 8px;
`;

const ChartControls = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  padding: 8px 16px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e2e8f0'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #667eea;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #718096;
  font-style: italic;
  background: #f8fafc;
  border-radius: 8px;
  border: 2px dashed #cbd5e0;
`;

const COLORS = ['#667eea', '#38a169', '#ed8936', '#e53e3e', '#3182ce'];

const CustomTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <CustomTooltip>
        <TooltipRow>
          <TooltipLabel>Product:</TooltipLabel>
          <TooltipValue>{data.product_name}</TooltipValue>
        </TooltipRow>
        <TooltipRow>
          <TooltipLabel>Sales:</TooltipLabel>
          <TooltipValue>${data.sales_amount.toFixed(2)}</TooltipValue>
        </TooltipRow>
        <TooltipRow>
          <TooltipLabel>Quantity:</TooltipLabel>
          <TooltipValue>{data.quantity}</TooltipValue>
        </TooltipRow>
        <TooltipRow>
          <TooltipLabel>Rating:</TooltipLabel>
          <TooltipValue>{'★'.repeat(data.customer_rating)}{data.customer_rating}/5</TooltipValue>
        </TooltipRow>
        <TooltipRow>
          <TooltipLabel>Category:</TooltipLabel>
          <TooltipValue>{data.category}</TooltipValue>
        </TooltipRow>
        <TooltipRow>
          <TooltipLabel>Region:</TooltipLabel>
          <TooltipValue>{data.region}</TooltipValue>
        </TooltipRow>
      </CustomTooltip>
    );
  }
  return null;
};

const PieTooltipContent = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    return (
      <CustomTooltip>
        <TooltipRow>
          <TooltipLabel>Category:</TooltipLabel>
          <TooltipValue>{payload[0].name}</TooltipValue>
        </TooltipRow>
        <TooltipRow>
          <TooltipLabel>Total Sales:</TooltipLabel>
          <TooltipValue>${payload[0].value.toFixed(2)}</TooltipValue>
        </TooltipRow>
      </CustomTooltip>
    );
  }
  return null;
};

const ChartVisualization = ({ data, selectedPoints, onPointSelect }) => {
  console.log('Multi-Chart Visualization loaded - NEW VERSION', { dataLength: data.length, selectedPoints });
  const handleChartClick = (clickedData) => {
    if (clickedData && clickedData.activePayload && clickedData.activePayload[0]) {
      const clickedPoint = clickedData.activePayload[0].payload;
      const pointId = clickedPoint.id;
      
      if (selectedPoints.includes(pointId)) {
        onPointSelect(selectedPoints.filter(id => id !== pointId));
      } else {
        onPointSelect([...selectedPoints, pointId]);
      }
    }
  };

  const clearSelection = () => {
    console.log('Clearing selection, current:', selectedPoints.length);
    onPointSelect([]);
  };

  // Data transformations for different chart types
  const scatterData = data.map(item => ({
    ...item,
    x: item.quantity,
    y: item.sales_amount,
    size: item.customer_rating * 30
  }));

  const barData = data.map(item => ({
    ...item,
    name: item.product_name.length > 15 ? item.product_name.substring(0, 15) + '...' : item.product_name
  }));

  const lineData = data
    .sort((a, b) => new Date(a.date_sold) - new Date(b.date_sold))
    .map(item => ({
      ...item,
      date: new Date(item.date_sold).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

  const pieData = data.reduce((acc, item) => {
    const existing = acc.find(cat => cat.name === item.category);
    if (existing) {
      existing.value += item.sales_amount;
    } else {
      acc.push({ name: item.category, value: item.sales_amount });
    }
    return acc;
  }, []);

  const CustomShape = (props) => {
    const { cx, cy, payload } = props;
    const isSelected = selectedPoints.includes(payload.id);
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isSelected ? 12 : 8}
        fill={isSelected ? '#e53e3e' : '#667eea'}
        stroke={isSelected ? '#c53030' : '#5a67d8'}
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  const CustomBar = (props) => {
    const { x, y, width, height, payload } = props;
    const isSelected = selectedPoints.includes(payload.id);
    
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isSelected ? '#e53e3e' : '#667eea'}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  const CustomLinePoint = (props) => {
    const { cx, cy, payload } = props;
    const isSelected = selectedPoints.includes(payload.id);
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isSelected ? 8 : 5}
        fill={isSelected ? '#e53e3e' : '#667eea'}
        stroke={isSelected ? '#c53030' : '#5a67d8'}
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  if (data.length === 0) {
    return (
      <EmptyMessage>
        No data available for the current selection criteria.<br/>
        Try adjusting the filters or selecting a different data check.
      </EmptyMessage>
    );
  }

  return (
    <>
      <ChartControls>
        <ControlButton
          active={selectedPoints.length > 0}
          onClick={clearSelection}
        >
          Clear Selection ({selectedPoints.length})
        </ControlButton>
      </ChartControls>

      <ChartsGrid>
        {/* Scatter Chart */}
        <ChartContainer>
          <ChartTitle>Sales vs Quantity (Scatter Plot)</ChartTitle>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 10, right: 10, bottom: 50, left: 10 }}
              onClick={handleChartClick}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="x" 
                name="Quantity"
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                dataKey="y" 
                name="Sales Amount"
                tick={{ fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltipContent />} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Scatter
                name="Products"
                data={scatterData}
                shape={<CustomShape />}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Bar Chart */}
        <ChartContainer>
          <ChartTitle>Sales by Product (Bar Chart)</ChartTitle>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, bottom: 70, left: 10 }}
              onClick={handleChartClick}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 9 }}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltipContent />} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar 
                dataKey="sales_amount" 
                name="Sales Amount ($)"
                shape={<CustomBar />}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Line Chart */}
        <ChartContainer>
          <ChartTitle>Sales Over Time (Line Chart)</ChartTitle>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{ top: 10, right: 10, bottom: 40, left: 10 }}
              onClick={handleChartClick}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltipContent />} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Line 
                type="monotone" 
                dataKey="sales_amount" 
                name="Sales Amount ($)"
                stroke="#667eea"
                strokeWidth={2}
                dot={<CustomLinePoint />}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Pie Chart */}
        <ChartContainer>
          <ChartTitle>Sales by Category (Pie Chart)</ChartTitle>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltipContent />} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartsGrid>

      <div style={{ 
        background: '#f0f4f8', 
        padding: '15px', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#4a5568'
      }}>
        <strong>How to use:</strong> Charts are displayed horizontally. Click on any data point in the Scatter, Bar, or Line charts to select it. Selected points will be highlighted in red across all charts and filter the table below. Click on a selected point again to deselect it. The Pie Chart shows category summaries and is not interactive.
      </div>
    </>
  );
};

export default ChartVisualization;