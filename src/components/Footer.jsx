import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="#">Terms of Service</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Contact Us</FooterLink>
        <FooterLink href="#">About</FooterLink>
      </FooterLinks>
      <p>© {new Date().getFullYear()} Vehicle Value Estimator. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
