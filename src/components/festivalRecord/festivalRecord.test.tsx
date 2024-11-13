import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FestivalRecord from './festivalRecord';
import { OutputRecord } from '../../types';

describe('FestivalRecord', () => {
  const mockData: OutputRecord = {
    recordLabel: 'Record Label Y',
    bands: [
      {
        name: 'Band B',
        festivals: ['Alpha Festival'],
      },
      {
        name: 'Band C',
        festivals: ['Beta Festival'],
      },
    ],
  };

  it('renders the record label', () => {
    render(<FestivalRecord {...mockData} />);
    expect(screen.getByText('Record Label Y')).toBeInTheDocument();
  });

  it('renders all band names', () => {
    render(<FestivalRecord {...mockData} />);
    expect(screen.getByText('Band B')).toBeInTheDocument();
    expect(screen.getByText('Band C')).toBeInTheDocument();
  });

  it('renders all festivals under each band', () => {
    render(<FestivalRecord {...mockData} />);
    expect(screen.getByText('Alpha Festival')).toBeInTheDocument();
    expect(screen.getByText('Beta Festival')).toBeInTheDocument();
  });
});
