import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SortSwitcher from './sortSwitcher';

describe('SortSwitcher', () => {
  const onToggleMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial state ASC', () => {
    render(<SortSwitcher onToggle={onToggleMock} />);

    // Check that the ASC option has the correct style for being active
    const ascElement = screen.getByText('ASC');
    expect(ascElement).toHaveClass('bg-blue-500 text-white');
    expect(screen.getByText('DESC')).toHaveClass('text-gray-600');
  });

  it('toggles to DESC when clicked and calls onToggle with "desc"', () => {
    render(<SortSwitcher onToggle={onToggleMock} />);
    const ascElement = screen.getByText('ASC');
    const descElement = screen.getByText('DESC');
    fireEvent.click(ascElement);

    // Check that DESC is now active
    expect(descElement).toHaveClass('bg-blue-500 text-white');
    expect(ascElement).toHaveClass('text-gray-600');

    // Verify that onToggle was called with "desc"
    expect(onToggleMock).toHaveBeenCalledWith('desc');
  });

  it('toggles back to ASC when clicked again and calls onToggle with "asc"', () => {
    render(<SortSwitcher onToggle={onToggleMock} />);
    const ascElement = screen.getByText('ASC');
    const descElement = screen.getByText('DESC');
    fireEvent.click(ascElement);
    fireEvent.click(descElement);

    // Check that ASC is now active again
    expect(ascElement).toHaveClass('bg-blue-500 text-white');
    expect(descElement).toHaveClass('text-gray-600');

    // Verify that onToggle was called with "asc" on the second click
    expect(onToggleMock).toHaveBeenCalledWith('asc');
  });
});
