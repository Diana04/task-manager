import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TaskCard } from '../TaskCard';

jest.mock('../../helpers', () => ({
    filterTaskTagsByIds: () => [
        {
            id: 'tag-1',
            title: 'tag-1',
            color: 'color-1',
        },
    ],
    getIsTaskUrgent: () => true,
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
        }),
}));

const setupComponent = (render: Function, props: any = {}) => {
    const fullProps = {
        title: 'title',
        tagIds: ['tag-1'],
        ...props,
    };

    const instance = render(<TaskCard {...fullProps} />);

    return {
        instance,
        props: fullProps,
    };
};

describe('TaskCard', () => {
    describe('snapshot check', () => {
        it('should render correctly according to snapshot', () => {
            const { instance } = setupComponent(render, {});
            expect(instance.container).toMatchSnapshot();
        });
    });

    describe('props check', () => {
        it('should render title', () => {
            const title = 'task-card-title';
            setupComponent(render, { title });
            const titleTextElement = screen.getByText(title);

            expect(titleTextElement).toBeInTheDocument();
        });

        it('should render tags', () => {
            setupComponent(render, {});
            const tagElement = screen.getByText('tag-1');

            expect(tagElement).toBeInTheDocument();
        });
    });
});
