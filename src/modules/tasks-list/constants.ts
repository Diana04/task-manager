import type { TaskTag } from './types';

export const URGENT_TASK_ID = 'task-id-3';

export const TASK_TAGS_INITIAL_LIST: TaskTag[] = [
    {
        id: 'task-id-1',
        title: 'Homework',
        color: '#87d068',
    },
    {
        id: 'task-id-2',
        title: 'Chores',
        color: '#2db7f5',
    },
    {
        id: URGENT_TASK_ID,
        title: 'Urgent',
        color: '#ff0000',
    },
];
