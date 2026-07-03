import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { VerifyOTP } from '../VerifyOTP/VerifyOTP';

describe('Verify OTP Page', () => {
  let user;
  let setIsAuthorized;
  let setPurpose;

  beforeEach(() => {
    user = userEvent.setup();
    setIsAuthorized = vi.fn();
    setPurpose = vi.fn();

  });

  it('renders the Verify OTP page correctly', () => {
    render(
      <MemoryRouter initialEntries={['/VerifyOTP']}>
        <Routes>
          <Route path='/VerifyOTP' element={<VerifyOTP isAuthorized={false} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('verifyotp-title')).toHaveTextContent('Verify OTP');
    expect(screen.getByTestId('verifyotp-input')).toHaveAttribute('placeholder', 'Enter OTP');
    expect(screen.getByTestId('verifyotp-submit')).toHaveTextContent('Verify OTP');
  })
})