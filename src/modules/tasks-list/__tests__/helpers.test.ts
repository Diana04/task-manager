import { URGENT_TASK_ID } from '../constants';
import { filterTaskTagsByIds, filterTasks, getIsTaskUrgent } from '../helpers';

jest.mock('../constants', () => ({
    URGENT_TASK_ID: 'URGENT_TASK_ID',
}));

describe('task module helpers', () => {
    describe('filterTaskTagsByIds', () => {
        const tags = [
            {
                id: 'tag-1',
                title: 'title-1',
                color: 'color-1',
            },
            {
                id: 'tag-2',
                title: 'title-2',
                color: 'color-2',
            },
            {
                id: 'tag-3',
                title: 'title-3',
                color: 'color-3',
            },
            {
                id: 'tag-4',
                title: 'title-4',
                color: 'color-4',
            },
        ];

        it("should return filtered tasks's tags by ids", () => {
            expect(filterTaskTagsByIds(['tag-2', 'tag-4'], tags)).toEqual([
                tags[1],
                tags[3],
            ]);
        });

        it('should return empty array if there are no tagIds', () => {
            expect(filterTaskTagsByIds([], tags)).toEqual([]);
        });

        it('should return empty array if there are no matches', () => {
            expect(filterTaskTagsByIds(['tag-not-existed'], tags)).toEqual([]);
        });
    });

    describe('filterTasks', () => {
        const tasks = [
            {
                id: 'task-1',
                title: 'task-1',
                tagIds: ['tag-2', 'tag-3'],
            },
            {
                id: 'task-2',
                title: 'task-2',
                tagIds: ['tag-2'],
            },
            {
                id: 'task-3',
                title: 'task-3',
                tagIds: ['tag-1', 'tag-2', 'tag-3'],
            },
            {
                id: 'task-4',
                title: 'task-4',
                tagIds: ['tag-1', 'tag-3'],
            },
        ];

        it('should filter tasks by every provided tagId in filters', () => {
            const filters = {
                tagIds: ['tag-1', 'tag-3'],
            };

            expect(filterTasks(tasks, filters)).toEqual([tasks[2], tasks[3]]);
        });

        it('should correctly filter tasks when filters contain 1 tagId', () => {
            const filters = {
                tagIds: ['tag-2'],
            };

            expect(filterTasks(tasks, filters)).toEqual([
                tasks[0],
                tasks[1],
                tasks[2],
            ]);
        });

        it('should return empty array if there are no matches', () => {
            const filters = {
                tagIds: ['tag-2', 'tag-is-not-existed-in-list'],
            };

            expect(filterTasks(tasks, filters)).toEqual([]);
        });

        it("shouldn't throw error if task doesn't contain tagIds", () => {
            const filters = {
                tagIds: ['tag-1', 'tag-2', 'tag-3'],
            };

            expect(() =>
                filterTasks(
                    [
                        ...tasks,
                        {
                            id: 'task-3',
                            title: 'task-3',
                            tagIds: [],
                        },
                    ],
                    filters
                )
            ).not.toThrow();
        });

        it('should return empty array if there are no tasks', () => {
            const filters = {
                tagIds: ['tag-1', 'tag-2', 'tag-3'],
            };

            expect(filterTasks([], filters)).toEqual([]);
        });

        it('should return initial tasks list if there are no tag filters', () => {
            const filters = {
                tagIds: [],
            };

            expect(filterTasks(tasks, filters)).toEqual(tasks);
        });
    });

    describe('getIsTaskUrgent', () => {
        it('should return true if tag ids contain urgent tag', () => {
            const tagIds = ['tag-1', 'tag-2', URGENT_TASK_ID, 'tag-4'];
            expect(getIsTaskUrgent(tagIds)).toBe(true);
        });

        it("should return false if tag ids don't contain urgent tag", () => {
            const tagIds = ['tag-1', 'tag-2', 'tag-3', 'tag-4'];
            expect(getIsTaskUrgent(tagIds)).toBe(false);
        });
    });
});
