import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CheckButton = styled.button`
  padding: 12px 16px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e2e8f0'};
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#2d3748'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CheckName = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const CheckDescription = styled.div`
  font-size: 0.85rem;
  opacity: 0.8;
`;

const LoadingMessage = styled.div`
  color: #718096;
  font-style: italic;
  text-align: center;
  padding: 20px;
`;

const CheckSelector = ({ selectedCheck, onCheckChange }) => {
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChecks();
  }, []);

  const fetchChecks = async () => {
    try {
      const response = await fetch('/api/checks');
      const data = await response.json();
      setChecks(data);
    } catch (error) {
      console.error('Error fetching checks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingMessage>Loading data checks...</LoadingMessage>;
  }

  return (
    <SelectorContainer>
      {checks.map(check => (
        <CheckButton
          key={check.id}
          selected={selectedCheck === check.id}
          onClick={() => onCheckChange(check.id)}
        >
          <CheckName>{check.name}</CheckName>
          <CheckDescription>{check.description}</CheckDescription>
        </CheckButton>
      ))}
    </SelectorContainer>
  );
};

export default CheckSelector;