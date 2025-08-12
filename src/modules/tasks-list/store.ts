import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { TagId, Task, TaskId, TasksFormFilters, TaskTag } from './types';
import { TASK_TAGS_INITIAL_LIST } from './constants';

type TasksState = {
    tasks: Task[];
    tags: TaskTag[];
    activeFilters: TasksFormFilters;
}

type TasksStateActions = {
    addTask: (title: string, tagIds: TagId[]) => void;
    removeTask: (taskId: TaskId) => void;

    addTag: (title: string, color: string) => void;
    removeTag: (tagId: TagId) => void;

    setActiveFilters: (filters: TasksFormFilters) => void;
}

export const useTasksStore = create<TasksState & TasksStateActions>()(
    devtools(immer(set => ({
        tasks: [],
        addTask: (title, tagIds) => set(state => {
            state.tasks.push({
                id: nanoid(),
                title,
                tagIds: tagIds || [],
            });
        }),
        removeTask: (taskId) => set(state => {
            state.tasks = state.tasks.filter(task => task.id !== taskId)
        }),

        tags: TASK_TAGS_INITIAL_LIST,
        addTag: (title, color) => set(state => {
            state.tags.push({
                id: nanoid(),
                title,
                color,
            });
        }),
        removeTag: (tagId) => set(state => {
            state.tags = state.tags.filter(tag => tag.id !== tagId)
        }),

        activeFilters: {
            tagIds: [],
        },
        setActiveFilters: (filters: TasksFormFilters) => set(state => {
            state.activeFilters = filters;
        }),
    })))
);
