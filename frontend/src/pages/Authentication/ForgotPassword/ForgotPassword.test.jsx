import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';

describe('ForgotPassword Page', () => {
    let setIsAuthorized;
    let setPurpose;

    beforeEach(() => {
        setIsAuthorized = vi.fn();
        setPurpose = vi.fn();
    });

    it('renders the Forgot Password page correctly', () => {
        render(
            <MemoryRouter>
                <ForgotPassword
                    isAuthorized={false}
                    setIsAuthorized={setIsAuthorized}
                    setPurpose={setPurpose}
                />
            </MemoryRouter>
        );

        expect(screen.getByTestId('forgot-title')).toHaveTextContent('Forgot Password');
        expect(screen.getByTestId('forgot-email')).toHaveAttribute('placeholder', 'Email');
        expect(screen.getByTestId('forgot-submit')).toHaveTextContent('Send Password Reset Request');
    });
});