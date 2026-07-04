import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { Sales } from '../Sales/Sales';

vi.mock('axios');

describe('Sales Page', () => {
    let setIsAuthorized;

    beforeEach(() => {
        setIsAuthorized = vi.fn();

        axios.get.mockResolvedValue({ data: { sales: [] } });
    });

    it('renders the Sales page layout and main action button', () => {
        render(
            <MemoryRouter>
                <Sales isAuthorized={true} setIsAuthorized={setIsAuthorized} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('sales-title')).toHaveTextContent('Sales');
        expect(screen.getByTestId('record-sale-btn')).toHaveTextContent('Record New Sale');

        expect(setIsAuthorized).toHaveBeenCalledWith(true);
    });
});