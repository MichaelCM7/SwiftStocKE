import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ResetPassword } from '../ResetPassword/ResetPassword';

describe('Reset Password Page', () => {
  let user;
  let setIsAuthorized;

  beforeEach(() => {
    user = userEvent.setup();
    setIsAuthorized = vi.fn();

  });

  it('renders the Reset Password page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/ResetPassword']}>
        <Routes>
          <Route path='/ResetPassword' element={<ResetPassword isAuthorized={false} setIsAuthorized={setIsAuthorized} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('resetpassword-title')).toHaveTextContent('Reset Password');
    expect(screen.getByTestId('resetpassword-password-input')).toHaveAttribute('placeholder', 'New Password');
    expect(screen.getByTestId('resetpassword-confirm-password-input')).toHaveAttribute('placeholder', 'Verify Password');
    expect(screen.getByTestId('resetpassword-submit')).toHaveTextContent('Reset Password');
  })
})