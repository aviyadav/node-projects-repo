import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DataTable from './components/DataTable';
import ChartVisualization from './components/ChartVisualization';
import CheckSelector from './components/CheckSelector';
import FilterPanel from './components/FilterPanel';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 0;
  margin: -20px -20px 30px -20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 350px 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 10px;
`;

const StatusInfo = styled.div`
  background: #f7fafc;
  border-left: 4px solid #4299e1;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 0 6px 6px 0;
`;

const StatusText = styled.p`
  color: #4a5568;
  font-size: 0.95rem;
  margin: 0;
`;

function App() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedCheck, setSelectedCheck] = useState('all');
  const [selectedChartPoints, setSelectedChartPoints] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    region: 'all',
    minSales: '',
    maxSales: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    fetchChartData();
  }, [selectedCheck, filters, selectedChartPoints, pagination.page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });

      if (selectedChartPoints.length > 0) {
        params.append('selectedIds', selectedChartPoints.join(','));
      }

      if (selectedCheck !== 'all') {
        params.append('checkType', selectedCheck);
      }

      const response = await fetch(`/api/data?${params}`);
      const result = await response.json();
      
      setData(result.data);
      setPagination(prev => ({
        ...prev,
        total: result.total,
        totalPages: result.totalPages
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    try {
      const params = new URLSearchParams({
        ...filters,
        checkType: selectedCheck === 'all' ? undefined : selectedCheck
      });

      const response = await fetch(`/api/data/chart?${params}`);
      const result = await response.json();
      setChartData(result);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const handleCheckChange = (checkId) => {
    setSelectedCheck(checkId);
    setSelectedChartPoints([]);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
    setSelectedChartPoints([]);
  };

  const handleChartPointSelect = (selectedIds) => {
    setSelectedChartPoints(selectedIds);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <Container>
      <Header>
        <Title>Data Visualization Dashboard</Title>
        <Subtitle>Interactive Data Analysis with Dynamic Filtering</Subtitle>
      </Header>

      <ContentGrid>
        <Sidebar>
          <Section>
            <SectionTitle>Data Checks</SectionTitle>
            <CheckSelector
              selectedCheck={selectedCheck}
              onCheckChange={handleCheckChange}
            />
          </Section>

          <Section>
            <SectionTitle>Filters</SectionTitle>
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Section>

          <StatusInfo>
            <StatusText>
              <strong>Total Records:</strong> {pagination.total}<br/>
              <strong>Current Page:</strong> {pagination.page} of {pagination.totalPages}<br/>
              <strong>Chart Selection:</strong> {selectedChartPoints.length} points selected
            </StatusText>
          </StatusInfo>
        </Sidebar>

        <MainContent>
          <Section>
            <SectionTitle>Chart Visualization</SectionTitle>
            <ChartVisualization
              data={chartData}
              selectedPoints={selectedChartPoints}
              onPointSelect={handleChartPointSelect}
            />
          </Section>

          <Section>
            <SectionTitle>Data Table</SectionTitle>
            <DataTable
              data={data}
              loading={loading}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </Section>
        </MainContent>
      </ContentGrid>
    </Container>
  );
}

export default App;