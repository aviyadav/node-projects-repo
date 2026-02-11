import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const FilterPanel = ({ filters, onFilterChange }) => {
  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    regions: []
  });

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const response = await fetch('/api/filters');
      const data = await response.json();
      setAvailableFilters(data);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const handleChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel>Category</FilterLabel>
        <FilterSelect
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="all">All Categories</option>
          {availableFilters.categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Region</FilterLabel>
        <FilterSelect
          value={filters.region}
          onChange={(e) => handleChange('region', e.target.value)}
        >
          <option value="all">All Regions</option>
          {availableFilters.regions.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Sales Amount Range</FilterLabel>
        <InputGroup>
          <FilterInput
            type="number"
            placeholder="Min"
            value={filters.minSales}
            onChange={(e) => handleChange('minSales', e.target.value)}
          />
          <span>to</span>
          <FilterInput
            type="number"
            placeholder="Max"
            value={filters.maxSales}
            onChange={(e) => handleChange('maxSales', e.target.value)}
          />
        </InputGroup>
      </FilterGroup>
    </FilterContainer>
  );
};

export default FilterPanel;