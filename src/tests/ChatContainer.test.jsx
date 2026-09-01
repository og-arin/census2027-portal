import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import { CensusDataProvider } from '../context/CensusDataContext';
import ChatContainer from '../components/ChatFlow/ChatContainer';

describe('ChatContainer Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Census Mitra greeting, input box, and suggested quick reply chips', () => {
    render(
      <LanguageProvider>
        <AuthProvider>
          <CensusDataProvider>
            <ChatContainer />
          </CensusDataProvider>
        </AuthProvider>
      </LanguageProvider>
    );

    // Verify Census Mitra heading badge exists
    expect(screen.getAllByText(/Census Mitra/i).length).toBeGreaterThan(0);

    // Verify initial greeting message renders
    expect(screen.getByText(/Phase 1: House Listing & Housing Census/i)).toBeInTheDocument();

    // Verify input box exists
    const inputElement = screen.getByLabelText(/Census Mitra conversation input/i);
    expect(inputElement).toBeInTheDocument();

    // Verify quick suggested chips render (e.g. Flat 101, Block A)
    expect(screen.getByText(/Flat 101, Block A/i)).toBeInTheDocument();
  });
});
