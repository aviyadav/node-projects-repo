import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8fafc;
  }
  
  &:hover {
    background-color: #edf2f7;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.9rem;
  color: #4a5568;
`;

const TableHeaderCell = styled.th`
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  color: #2d3748;
  border-bottom: 2px solid #cbd5e0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
`;

const PaginationInfo = styled.div`
  color: #718096;
  font-size: 0.9rem;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #cbd5e0;
  background: white;
  color: #4a5568;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #f7fafc;
    border-color: #a0aec0;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #718096;
  font-style: italic;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #718096;
  font-style: italic;
`;

const DataTable = ({ data, loading, pagination, onPageChange }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return <LoadingOverlay>Loading data...</LoadingOverlay>;
  }

  if (data.length === 0) {
    return <EmptyMessage>No data found matching the current criteria.</EmptyMessage>;
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Sales Amount</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Rating</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell><strong>{row.product_name}</strong></TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{formatCurrency(row.sales_amount)}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{formatDate(row.date_sold)}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>
                  <span style={{ color: row.customer_rating >= 4 ? '#38a169' : '#e53e3e' }}>
                    {renderStars(row.customer_rating)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        <PaginationInfo>
          Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
          {pagination.total} entries
        </PaginationInfo>
        
        <PaginationButtons>
          <PaginationButton
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </PaginationButton>
          
          <span style={{ padding: '8px 12px', color: '#4a5568' }}>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          
          <PaginationButton
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
          </PaginationButton>
        </PaginationButtons>
      </PaginationContainer>
    </>
  );
};

export default DataTable;