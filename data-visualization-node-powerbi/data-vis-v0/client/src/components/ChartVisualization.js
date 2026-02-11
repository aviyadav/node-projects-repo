import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 20px 0;
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

const CustomTooltipContent = ({ active, payload }) => {
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

const ChartVisualization = ({ data, selectedPoints, onPointSelect }) => {
  const [chartMode, setChartMode] = useState('sales_quantity');
  
  const handleModeChange = (mode) => {
    setChartMode(mode);
  };

  const handleChartClick = (data) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const clickedPoint = data.activePayload[0].payload;
      const pointId = clickedPoint.id;
      
      if (selectedPoints.includes(pointId)) {
        onPointSelect(selectedPoints.filter(id => id !== pointId));
      } else {
        onPointSelect([...selectedPoints, pointId]);
      }
    }
  };

  const clearSelection = () => {
    onPointSelect([]);
  };

  const getChartData = () => {
    switch (chartMode) {
      case 'sales_quantity':
        return data.map(item => ({
          ...item,
          x: item.quantity,
          y: item.sales_amount,
          size: item.customer_rating * 30
        }));
      case 'sales_rating':
        return data.map(item => ({
          ...item,
          x: item.customer_rating,
          y: item.sales_amount,
          size: item.quantity * 5
        }));
      case 'quantity_rating':
        return data.map(item => ({
          ...item,
          x: item.customer_rating,
          y: item.quantity,
          size: item.sales_amount / 20
        }));
      default:
        return data;
    }
  };

  const getAxisLabels = () => {
    switch (chartMode) {
      case 'sales_quantity':
        return { x: 'Quantity', y: 'Sales Amount ($)' };
      case 'sales_rating':
        return { x: 'Customer Rating', y: 'Sales Amount ($)' };
      case 'quantity_rating':
        return { x: 'Customer Rating', y: 'Quantity' };
      default:
        return { x: '', y: '' };
    }
  };

  const chartData = getChartData();
  const axisLabels = getAxisLabels();

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
          active={chartMode === 'sales_quantity'}
          onClick={() => handleModeChange('sales_quantity')}
        >
          Sales vs Quantity
        </ControlButton>
        <ControlButton
          active={chartMode === 'sales_rating'}
          onClick={() => handleModeChange('sales_rating')}
        >
          Sales vs Rating
        </ControlButton>
        <ControlButton
          active={chartMode === 'quantity_rating'}
          onClick={() => handleModeChange('quantity_rating')}
        >
          Quantity vs Rating
        </ControlButton>
        <ControlButton
          active={selectedPoints.length > 0}
          onClick={clearSelection}
          disabled={selectedPoints.length === 0}
        >
          Clear Selection ({selectedPoints.length})
        </ControlButton>
      </ChartControls>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
            onClick={handleChartClick}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="x"
              name={axisLabels.x}
              label={{ value: axisLabels.x, position: 'insideBottom', offset: -10 }}
            />
            <YAxis
              dataKey="y"
              name={axisLabels.y}
              label={{ value: axisLabels.y, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltipContent />} />
            <Legend />
            <Scatter
              name="Products"
              data={chartData}
              shape={<CustomShape />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div style={{ 
        background: '#f0f4f8', 
        padding: '15px', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#4a5568'
      }}>
        <strong>How to use:</strong> Click on any data point to select it. Selected points will be highlighted in red and the table below will filter to show only those records. Click on a selected point again to deselect it.
      </div>
    </>
  );
};

export default ChartVisualization;