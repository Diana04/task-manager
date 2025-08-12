import { useMemo } from 'react';
import { Empty, Typography } from 'antd';
import styled from 'styled-components';

import { useTasksStore } from '../store';
import { filterTasks } from '../helpers';
import { TaskCard } from './TaskCard';

const StyledEmpty = styled(Empty)`
  background-color: #f5f5f5;
  padding: 24px;
  margin: 0;
  border-radius: 6px;
`;

export const TasksList = () => {
    const tasks = useTasksStore(state => state.tasks);
    const activeFilters = useTasksStore(state => state.activeFilters);

    const filteredTasks = useMemo(() => (
        filterTasks(tasks, activeFilters)
    ), [tasks, activeFilters]);

    if (!filteredTasks?.length) {
        return (
            <StyledEmpty
                description={
                    <Typography.Text type="secondary">
                        There are no tasks yet
                    </Typography.Text>
                }
            />
        );
    }

    return (
        <>
            {filteredTasks.map((task) => (
                <TaskCard
                    title={task.title}
                    tagIds={task.tagIds}
                    key={task.id}
                />
            ))}
        </>
    );
}