import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Home } from './Home';

describe('Home Page', () => {
  let user;
  let setIsAuthorized;

  beforeEach(() => {
    user = userEvent.setup();
    setIsAuthorized = vi.fn();
  })

  it('renders the home page', () => {
    render(
      <MemoryRouter>
        <Home isAuthorized={true} setIsAuthorized={setIsAuthorized} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('hero-title')).toHaveTextContent('Master Your Supply Chain');
    expect(screen.getByTestId('hero-subtitle')).toHaveTextContent('Because Precision Matters');
    expect(screen.getByTestId('get-started-btn')).toHaveTextContent('Get Started');
    expect(screen.getByTestId('intro')).toHaveTextContent('What is SwiftStock?');
    expect(screen.getByTestId('feature-card')).toHaveTextContent('Real Time Monitoring');
    expect(screen.getByTestId('details-title')).toHaveTextContent('Track. Analyse. Replenish.');
    expect(screen.getByTestId('bottom-cta-title')).toHaveTextContent('Get Your Inventory on Point');
  });


});