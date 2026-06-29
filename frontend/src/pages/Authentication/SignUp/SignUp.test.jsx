import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import axios from 'axios';
import { SignUp } from './SignUp';
import { SignIn } from '../SignIn/SignIn';
import { VerifyOTP } from '../VerifyOTP/VerifyOTP';

vi.mock('axios');

describe('Sign Up Page', () => {
  let user;
  let setIsAuthorized;
  let setPurpose;

  beforeEach(() => {
    user = userEvent.setup();
    setIsAuthorized = vi.fn();
    setPurpose = vi.fn();
  })

  it('renders the sign up page', () => {
    render(
      <MemoryRouter>
        <SignUp isAuthorized={true} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('signup-title')).toHaveTextContent('Sign Up');
    expect(screen.getByTestId('email-input')).toHaveAttribute('placeholder', 'Email');
    expect(screen.getByTestId('password-input')).toHaveAttribute('placeholder', 'Password');
    expect(screen.getByTestId('confirm-password-input')).toHaveAttribute('placeholder', 'Confirm Password');
  });

  it('allows typing and submitting the form', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SignUp isAuthorized={true} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />
      </MemoryRouter>
    );

    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');

    const passwordInput = screen.getByTestId('password-input');
    await user.type(passwordInput, 'password123');
    expect(passwordInput).toHaveValue('password123');

    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    await user.type(confirmPasswordInput, 'password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  it('validates password confirmation and shows error', async () => {
    render(
      <MemoryRouter initialEntries={['/SignUp']}>
        <Routes>
          <Route path="/SignUp" element={<SignUp isAuthorized={true} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />} />
        </Routes>
      </MemoryRouter>
    );

    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.type(screen.getByTestId('confirm-password-input'), 'wrongpassword');

    const form = screen.getByTestId('signup-form');

    fireEvent.submit(form);

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    render(
      <MemoryRouter>
        <SignUp isAuthorized={true} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />
      </MemoryRouter>
    );

    const passwordInput = screen.getByTestId('password-input');
    const toggleBtn = passwordInput.parentElement.querySelector('.password-toggle-btn');

    // Password should be hidden initially
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Toggle to show password
    await user.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Toggle back to hide password
    await user.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('handles form submission successfully and navigates to VerifyOTP', async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter initialEntries={['/SignUp']}>
        <Routes>
          <Route path="/SignUp" element={<SignUp isAuthorized={true} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />} />
          <Route path="/VerifyOTP" element={<VerifyOTP isAuthorized={true} setIsAuthorized={setIsAuthorized} purpose="signup" />} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'test@example.com');

    const passwordInput = screen.getByTestId('password-input');
    await user.type(passwordInput, 'password123');

    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    await user.type(confirmPasswordInput, 'password123');

    const signUpBtn = screen.getByTestId('signup-btn');
    await user.click(signUpBtn);

    expect(axios.post).toHaveBeenCalledWith('/api/auth/signup', {
      email: 'test@example.com',
      password: 'password123'
    });
    expect(await screen.findByTestId('verifyotp-title')).toHaveTextContent('Verify OTP');
  });

  it('navigates to sign in page from sign up page', async () => {
    render(
      <MemoryRouter initialEntries={['/SignUp']}>
        <Routes>
          <Route path="/SignUp" element={<SignUp isAuthorized={true} setIsAuthorized={setIsAuthorized} setPurpose={setPurpose} />} />
          <Route path="/SignIn" element={<SignIn isAuthorized={true} setIsAuthorized={setIsAuthorized} />} />
        </Routes>
      </MemoryRouter>
    );

    const signInLink = screen.getByText('Sign In');
    await user.click(signInLink);

    expect(screen.getByTestId('signin-title')).toHaveTextContent('Sign In');
  });

});