import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { Home } from './Home';
import { SignUp } from '../Authentication/SignUp/SignUp';

describe('Home Page', () => {
  let user;
  let setIsAuthorized;
  let setPurpose;

  beforeEach(() => {
    user = userEvent.setup();
    setIsAuthorized = vi.fn();
    setPurpose = vi.fn();
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

  it('navigates to sign up page on CTA button click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home isAuthorized={true} setIsAuthorized={setIsAuthorized} />} />
          <Route path="/SignUp" element={<SignUp isAuthorized={true} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />} />
        </Routes>
      </MemoryRouter>
    );

    const callToActionBtn = screen.getByTestId('get-started-btn');
    await user.click(callToActionBtn);

    expect(screen.getByTestId('signup-title')).toHaveTextContent('Sign Up');
    expect(setIsAuthorized).toHaveBeenCalledTimes(2);
    expect(setPurpose).toHaveBeenCalledWith('signup');
  });

});