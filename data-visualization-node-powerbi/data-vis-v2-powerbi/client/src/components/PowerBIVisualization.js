import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PowerBIChart from './PowerBIChart';

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
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
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
    border-color: '#667eea';
  }
`;

const SetupGuide = styled.div`
  background: #f0f4f8;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
`;

const GuideTitle = styled.h3`
  color: #2d3748;
  margin: 0 0 15px 0;
  font-size: 1.1rem;
`;

const Step = styled.div`
  margin: 10px 0;
  color: #4a5568;
`;

const StepNumber = styled.span`
  background: #667eea;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 10px;
`;

const Code = styled.code`
  background: #2d3748;
  color: #48bb78;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
`;

const PowerBIVisualization = ({ data, selectedPoints, onPointSelect }) => {
  const [usePowerBI, setUsePowerBI] = useState(false);
  const [powerBIConfig, setPowerBIConfig] = useState({
    // Replace these with your actual Power BI embed URLs
    scatterChart: '',
    barChart: '', 
    lineChart: '',
    pieChart: ''
  });

  // Mock Power BI embed URLs - replace with real ones
  const mockPowerBIUrls = {
    scatterChart: 'https://app.powerbi.com/view?r=YOUR_SCATTER_EMBED_CODE',
    barChart: 'https://app.powerbi.com/view?r=YOUR_BAR_EMBED_CODE',
    lineChart: 'https://app.powerbi.com/view?r=YOUR_LINE_EMBED_CODE', 
    pieChart: 'https://app.powerbi.com/view?r=YOUR_PIE_EMBED_CODE'
  };

  const handleChartPointSelect = (selectedIds) => {
    onPointSelect(selectedIds);
  };

  const togglePowerBI = () => {
    setUsePowerBI(!usePowerBI);
  };

  const clearSelection = () => {
    onPointSelect([]);
  };

  if (!usePowerBI) {
    return (
      <>
        <ChartControls>
          <ControlButton 
            active={false}
            onClick={togglePowerBI}
          >
            Enable Power BI Visualizations
          </ControlButton>
          <ControlButton
            active={selectedPoints.length > 0}
            onClick={clearSelection}
          >
            Clear Selection ({selectedPoints.length})
          </ControlButton>
        </ChartControls>

        <SetupGuide>
          <GuideTitle>🚀 Power BI Integration Setup</GuideTitle>
          
          <Step>
            <StepNumber>1</StepNumber>
            <strong>Publish to Power BI:</strong> Upload your data to Power BI service
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <strong>Create Visualizations:</strong> Build Scatter, Bar, Line, and Pie charts
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <strong>Get Embed Codes:</strong> 
            <ul style={{ marginLeft: 20, marginTop: 5 }}>
              <li>Go to File → Embed → Publish to web (public)</li>
              <li>Or use Power BI Embedded for enterprise</li>
            </ul>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <strong>Update Configuration:</strong> 
            <p style={{ marginLeft: 34, marginTop: 5 }}>
              Replace the mock URLs in <Code>PowerBIVisualization.js</Code>:
            </p>
            <pre style={{ 
              background: '#2d3748', 
              color: '#48bb78', 
              padding: 10, 
              borderRadius: 4,
              marginLeft: 34,
              fontSize: '0.85rem'
            }}>
{`const powerBIUrls = {
  scatterChart: 'YOUR_POWERBI_SCATTER_URL',
  barChart: 'YOUR_POWERBI_BAR_URL', 
  lineChart: 'YOUR_POWERBI_LINE_URL',
  pieChart: 'YOUR_POWERBI_PIE_URL'
};`}
            </pre>
          </Step>
          
          <Step>
            <StepNumber>5</StepNumber>
            <strong>Enable JavaScript API:</strong> Add Power BI interaction scripts to enable cross-chart selection
          </Step>

          <div style={{ 
            background: '#e6fffa', 
            border: '1px solid #4fd1c5',
            borderRadius: '6px',
            padding: '15px',
            marginTop: '20px',
            color: '#234e52'
          }}>
            <strong>💡 Benefits of Power BI Integration:</strong>
            <ul style={{ marginLeft: 20, marginTop: 10 }}>
              <li>Professional-grade visualizations</li>
              <li>Advanced analytics capabilities</li>
              <li>DAX expressions and calculations</li>
              <li>Enterprise security features</li>
              <li>Automatic data refresh options</li>
            </ul>
          </div>
        </SetupGuide>
      </>
    );
  }

  return (
    <>
      <ChartControls>
        <ControlButton 
          active={true}
          onClick={togglePowerBI}
        >
          Disable Power BI (Use React Charts)
        </ControlButton>
        <ControlButton
          active={selectedPoints.length > 0}
          onClick={clearSelection}
        >
          Clear Selection ({selectedPoints.length})
        </ControlButton>
      </ChartControls>

      <ChartsGrid>
        <ChartContainer>
          <PowerBIChart
            title="Sales vs Quantity (Power BI)"
            embedUrl={powerBIConfig.scatterChart || mockPowerBIUrls.scatterChart}
            onChartClick={handleChartPointSelect}
            selectedIds={selectedPoints}
          />
        </ChartContainer>

        <ChartContainer>
          <PowerBIChart
            title="Sales by Product (Power BI)"
            embedUrl={powerBIConfig.barChart || mockPowerBIUrls.barChart}
            onChartClick={handleChartPointSelect}
            selectedIds={selectedPoints}
          />
        </ChartContainer>

        <ChartContainer>
          <PowerBIChart
            title="Sales Over Time (Power BI)"
            embedUrl={powerBIConfig.lineChart || mockPowerBIUrls.lineChart}
            onChartClick={handleChartPointSelect}
            selectedIds={selectedPoints}
          />
        </ChartContainer>

        <ChartContainer>
          <PowerBIChart
            title="Sales by Category (Power BI)"
            embedUrl={powerBIConfig.pieChart || mockPowerBIUrls.pieChart}
            onChartClick={handleChartPointSelect}
            selectedIds={selectedPoints}
          />
        </ChartContainer>
      </ChartsGrid>

      <div style={{ 
        background: '#f0f4f8', 
        padding: '15px', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#4a5568'
      }}>
        <strong>Power BI Charts:</strong> Click on any data point in Power BI visualizations to select it. Selected points will filter the table below. Use the setup guide above to configure your Power BI embed URLs.
      </div>
    </>
  );
};

export default PowerBIVisualization;