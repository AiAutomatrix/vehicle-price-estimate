import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import ReportModal from '../components/ReportModal';

const ReportsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReportItem = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const ReportCheckbox = styled.input`
  margin-right: 1rem;
`;

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const EditModeOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SelectAllButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const SavedReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedReports, setSelectedReports] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const savedReports = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('report-')) {
        const report = localStorage.getItem(key);
        savedReports.push({ id: key, data: report });
      }
    }
    setReports(savedReports);
  }, []);

  const handleReportClick = (report) => {
    if (isEditMode) {
      handleSelectReport(report.id);
    } else {
      setSelectedReport(report.data);
    }
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const handleSelectReport = (reportId) => {
    setSelectedReports((prevSelected) => {
      if (prevSelected.includes(reportId)) {
        return prevSelected.filter((id) => id !== reportId);
      } else {
        return [...prevSelected, reportId];
      }
    });
  };

  const handleSelectAll = () => {
      console.log('handleSelectAll called', isEditMode);
    if (selectedReports.length === reports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reports.map((report) => report.id));
    }
  };

  const handleDeleteSelected = () => {
    selectedReports.forEach((reportId) => {
      localStorage.removeItem(reportId);
    });
    setReports(reports.filter((report) => !selectedReports.includes(report.id)));
    setSelectedReports([]);
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedReports([]);
  };

  return (
    <>
      <Header />
      <ReportsContainer>
        <h1>Saved Reports</h1>
        <EditModeOptions>
          <EditButton onClick={handleToggleEditMode} style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>
            {isEditMode ? 'Disable Edit' : 'Enable Edit'}
          </EditButton>
          {isEditMode && (
            <SelectAllButton onClick={handleSelectAll}>
              {selectedReports.length === reports.length ? 'Deselect All' : 'Select All'}
            </SelectAllButton>
          )}
          {isEditMode && (
            <DeleteButton onClick={handleDeleteSelected}>Delete Selected</DeleteButton>
          )}
        </EditModeOptions>
        {reports.map((report, index) => {
          return (
            <ReportItem key={index} onClick={() => handleReportClick(report)}>
              <div>
                <h2>Report {index + 1}</h2>
              </div>
              {isEditMode && (
                <ReportCheckbox
                  type="checkbox"
                  value={report.id}
                  checked={selectedReports.includes(report.id)}
                  onChange={() => handleSelectReport(report.id)}
                />
              )}
            </ReportItem>
          );
        })}
      </ReportsContainer>
      {selectedReport && (
        <ReportModal report={selectedReport} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default SavedReports;