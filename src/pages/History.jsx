import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HistoryIcon } from '../assets/icons/history.svg';
import HistoryItem from '../components/HistoryItem';
import Header from '../components/Header';

const HistoryContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const HistoryTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const History = () => {
  // Mock history data
  const historyItems = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: '2020',
      date: '2023-05-15',
      price: '$24,500',
      image: 'car-placeholder.png',
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: '2018',
      date: '2023-04-22',
      price: '$18,200',
      image: 'car-placeholder.png',
    },
  ];

  return (
    <>
      <Header />
      <HistoryContainer>
        <HistoryHeader>
          <HistoryIcon width={32} height={32} fill="#2563eb" />
          <HistoryTitle>Valuation History</HistoryTitle>
        </HistoryHeader>

        {historyItems.length > 0 ? (
          <HistoryList>
            {historyItems.map((item) => (
              <HistoryItem key={item.id} item={item} />
            ))}
          </HistoryList>
        ) : (
          <EmptyState>
            <p>No valuation history yet</p>
            <p>Get started by valuing your vehicle</p>
          </EmptyState>
        )}
      </HistoryContainer>
    </>
  );
};

export default History;
