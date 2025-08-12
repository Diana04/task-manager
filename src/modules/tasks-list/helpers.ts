import type { TagId, Task, TasksFormFilters, TaskTag } from './types';

export const filterTaskTagsByIds = (tagIds: TagId[], tags: TaskTag[]): TaskTag[] => (
    tags.filter(tag => (
        tagIds?.length && tagIds.includes(tag.id)
    ))
)

export const filterTasks = (tasks: Task[], filters: TasksFormFilters): Task[] => {
    const { tagIds: filterTagIds } = filters;

    if (tasks?.length > 0) {
        return tasks.filter(task => filterTagIds.every(filterTagId => task.tagIds.includes(filterTagId)))
    }

    return tasks;
}
