import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

function TestConsumer() {
  const { t, language } = useLanguage();
  return (
    <div>
      <LanguageToggle />
      <div data-testid="current-lang">{language}</div>
      <div data-testid="portal-title">{t('portalTitle')}</div>
    </div>
  );
}

describe('LanguageToggle Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders with English by default and switches to Hindi when toggled', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );

    // Check English initial state
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    expect(screen.getByTestId('portal-title')).toHaveTextContent('Census 2027 Portal');

    // Click Hindi button
    const hindiBtn = screen.getByTitle('हिन्दी में बदलें');
    fireEvent.click(hindiBtn);

    // Verify switched to Hindi
    expect(screen.getByTestId('current-lang')).toHaveTextContent('hi');
    expect(screen.getByTestId('portal-title')).toHaveTextContent('जनगणना 2027 पोर्टल');
    expect(localStorage.getItem('census_portal_lang')).toBe('hi');

    // Click English button back
    const englishBtn = screen.getByTitle('Switch to English');
    fireEvent.click(englishBtn);

    // Verify switched back to English
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    expect(screen.getByTestId('portal-title')).toHaveTextContent('Census 2027 Portal');
  });
});
