// import { nanoid } from 'nanoid';
// import { create } from 'zustand';
// import { persist, devtools } from 'zustand/middleware';
// import { immer } from 'zustand/middleware/immer';

// const useAppStore = create(() => ({}));

// type TaskTag = {
//     id: string;
//     title: string;
// }

// type Task = {
//     id: string;
//     title: string;
//     tags: TaskTag[];
// }

// type TasksFormActiveFilters = {
//     tags: TaskTag[];
// }

// const TASK_TAGS_INITIAL_LIST: TaskTag[] = [
//     {
//         id: 'task-id-1',
//         title: 'Homework'
//     },
//     {
//         id: 'task-id-2',
//         title: 'Chores'
//     },
//     {
//         id: 'task-id-3',
//         title: 'Urgent'
//     }
// ]

// type TasksState = {
//     tasks: Task[];
//     addTask: (title: string, tags: TaskTag[]) => void;
//     removeTask: (taskId: string) => void;

//     tags: TaskTag[];
//     addTag: (title: string) => void;
//     removeTag: (tagId: string) => void;

//     activeFilters: TasksFormActiveFilters;
//     setActiveFilters: (filters: TasksFormActiveFilters) => void;
// }

// const useTasksStore = create<TasksState>()(persist(devtools(immer(set => ({
//     tasks: [],
//     addTask: (title, tags) => set(state => ({
//             tasks: [
//                 ...state.tasks,
//                 {
//                     id: nanoid(),
//                     title,
//                     tags,
//                 },
//             ]
//         })
//     ),
//     // removeTask: (taskId) => {set(...)},

//     // tags: [],
//     // addTag: (title) => {set(...)},
//     // removeTag: (tagId) => {set(...)},

//     activeFilters: [],
//     setActiveFilters: (filters: TasksFormActiveFilters) => {set(...)},
// }))), {name: 'tasksStore', version: 1}));



// // const TasksList = () => {
// //     const tasks = useTasksStore(state => state.tasks);
// //     const addTask = useTasksStore(state => state.addTask);

// //     // OR

// //     const {tasks, addTask} = useTasksStore(state => ({
// //         tasks: state.tasks,
// //         addTask: state.addTask,
// //     }))
// // }

