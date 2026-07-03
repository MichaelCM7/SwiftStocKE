import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { Analytics } from '../Analytics/Analytics';

vi.mock('axios');

describe('Analytics Page', () => {
    let setIsAuthorized;

    beforeEach(() => {
        setIsAuthorized = vi.fn();

        axios.get.mockImplementation((url) => {
            if (url === '/api/products/get-items') {
                return Promise.resolve({ data: { products: [] } });
            }
            if (url === '/api/analytics/') {
                return Promise.resolve({ data: { analytics: [{ data: [] }] } });
            }
            return Promise.resolve({ data: {} });
        });
    });

    it('renders the Analytics layout correctly', async () => {
        render(
            <MemoryRouter>
                <Analytics isAuthorized={true} setIsAuthorized={setIsAuthorized} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('analytics-title')).toHaveTextContent('Analytics');
        expect(screen.getByTestId('distribution-title')).toHaveTextContent('Stock Distribution');
        expect(screen.getByTestId('levels-title')).toHaveTextContent('Stock Levels');
        expect(screen.getByTestId('high-demand-title')).toHaveTextContent('High Demand Items');
        expect(screen.getByTestId('low-demand-title')).toHaveTextContent('Low Demand Items');
        expect(screen.getByTestId('restock-title')).toHaveTextContent('Items That Need Restocking');

        expect(setIsAuthorized).toHaveBeenCalledWith(true);
    });
});