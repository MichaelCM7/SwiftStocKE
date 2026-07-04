import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { ManageStock } from '../ManageStock/ManageStock';

vi.mock('axios');

describe('ManageStock Page', () => {
    let setIsAuthorized;

    beforeEach(() => {
        setIsAuthorized = vi.fn();

        axios.get.mockResolvedValue({ data: { products: [] } });
    });

    it('renders the Manage Stock page layouts and navigation controls', () => {
        render(
            <MemoryRouter>
                <ManageStock isAuthorized={true} setIsAuthorized={setIsAuthorized} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('stock-title')).toHaveTextContent('Manage Stock');
        expect(screen.getByTestId('restock-btn')).toHaveTextContent('Restock');
        expect(screen.getByTestId('add-item-btn')).toHaveTextContent('Add New Item');

        expect(setIsAuthorized).toHaveBeenCalledWith(true);
    });
});