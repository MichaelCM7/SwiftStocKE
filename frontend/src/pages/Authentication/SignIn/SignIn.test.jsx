import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { SignIn } from '../SignIn/SignIn';

describe('SignIn Page', () => {
  let user;
  let setIsAuthorized;

  beforeEach(() => {
    user = userEvent.setup();
    setIsAuthorized = vi.fn();

  });

  it('renders the Sign In page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/SignIn']}>
        <Routes>
          <Route path='/SignIn' element={<SignIn isAuthorized={false} setIsAuthorized={setIsAuthorized} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('signin-title')).toHaveTextContent('Sign In');
    expect(screen.getByTestId('signin-email')).toHaveAttribute('placeholder', 'Email');
    expect(screen.getByTestId('signin-password')).toHaveAttribute('placeholder', 'Password');
    expect(screen.getByTestId('signin-submit')).toHaveTextContent('Sign In');
  })


})