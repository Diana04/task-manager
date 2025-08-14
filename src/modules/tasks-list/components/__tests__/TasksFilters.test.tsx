import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { TasksFilters } from '../TasksFilters';

const setActiveFiltersMock = jest.fn();

jest.mock('antd', () => ({
    ...jest.requireActual('antd'),
    Flex: ({ children }: { children: any }) => <>{children}</>,
    Typography: {
        Title: ({ children }: { children: any }) => <>{children}</>,
    },
}));

jest.mock('../../store', () => ({
    useTasksStore: (selector: any) =>
        selector({
            tags: [
                {
                    id: 'tag-1',
                    title: 'tag-1',
                    color: 'color-1',
                },
                {
                    id: 'tag-2',
                    title: 'tag-2',
                    color: 'color-2',
                },
            ],
            activeFilters: {
                tagIds: ['tag-2'],
            },
            setActiveFilters: setActiveFiltersMock,
        }),
}));

describe('TasksFilters', () => {
    describe('snapshot check', () => {
        it('should render correctly according to snapshot', () => {
            const { container } = render(<TasksFilters />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('render check', () => {
        it('should render 2 checkboxes', () => {
            render(<TasksFilters />);
            const checkbox = screen.getAllByRole('checkbox');
            expect(checkbox).toHaveLength(2);
        });

        it('should render one unchecked checkbox and one checked checkbox', () => {
            render(<TasksFilters />);
            const checkbox1 = screen.getByDisplayValue('tag-1');
            const checkbox2 = screen.getByDisplayValue('tag-2');

            expect(checkbox1).toBeInTheDocument();
            expect(checkbox1).not.toBeChecked();

            expect(checkbox2).toBeInTheDocument();
            expect(checkbox2).toBeChecked();
        });
    });

    describe('behaviour check', () => {
        it('should call setActiveFilters on checkbox click with new tagsIds list', async () => {
            render(<TasksFilters />);
            const checkbox = screen.getByDisplayValue('tag-1');
            await userEvent.click(checkbox);

            expect(setActiveFiltersMock).toHaveBeenCalledWith({
                tagIds: ['tag-2', 'tag-1'],
            });
        });

        it('should call setActiveFilters on checkbox click with empty tagsIds list', async () => {
            render(<TasksFilters />);
            const checkbox = screen.getByDisplayValue('tag-2');
            await userEvent.click(checkbox);

            expect(setActiveFiltersMock).toHaveBeenCalledWith({ tagIds: [] });
        });
    });
});
