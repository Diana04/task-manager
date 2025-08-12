export type TaskId = string;

export type Task = {
    id: TaskId;
    title: string;
    tagIds: string[];
}

export type TagId = string;

export type TaskTag = {
    id: TagId;
    title: string;
    color: string;
}

export type TasksFormFilters = {
    tagIds: TagId[];
}
