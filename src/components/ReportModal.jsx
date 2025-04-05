import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ExitIcon } from '../assets/icons/restart.svg';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  width: 80%;
  max-width: 800px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const ReportModal = ({ report, onClose }) => {
  const { vehicle, valuation } = JSON.parse(report);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <ExitIcon width={20} height={20} fill="currentColor" />
        </CloseButton>
        <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
        <p>Valuation: {valuation.price}</p>
        {valuation.breakdown.map((item, index) => (
          <p key={index}>{item.label}: {item.value}</p>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReportModal;