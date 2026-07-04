import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { History } from '../History/History';

vi.mock('axios');

describe('History Page', () => {
    let setIsAuthorized;

    beforeEach(() => {
        setIsAuthorized = vi.fn();

        axios.get.mockResolvedValue({ data: { history: [] } });
    });

    it('renders the History layout structure correctly', () => {
        render(
            <MemoryRouter>
                <History isAuthorized={true} setIsAuthorized={setIsAuthorized} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('history-title')).toHaveTextContent('History');

        expect(setIsAuthorized).toHaveBeenCalledWith(true);
    });
});