import { useState } from 'react';
import { Button, Divider, Flex, Layout, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { useTasksStore, TasksFilters, AddTaskModal, TagsManagerDrawer, TasksList } from '@/modules/tasks-list';

const StyledTypographyTitle = styled(Typography.Title)`
  margin: 0;
`;

export const TasksPage = () => {
    const tasks = useTasksStore(state => state.tasks);

    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isManageTagsDrawerOpen, setIsManageTagsDrawerOpen] = useState(false);

    const openAddTaskModal = () => {
        setIsAddTaskModalOpen(true);
    };

    const closeAddTaskModal = () => {
        setIsAddTaskModalOpen(false);
    };

    const openManageTagsDrawer = () => {
        setIsManageTagsDrawerOpen(true);
    };

    const closeManageDrawerDrawer = () => {
        setIsManageTagsDrawerOpen(false);
    };

    return (
        <Layout.Content>
            <StyledTypographyTitle level={1}>
                Task Manager
            </StyledTypographyTitle>
            <Divider />
            <Flex vertical gap="middle">
                {tasks?.length > 0 && <TasksFilters />}

                <Flex align="center" justify="space-between">
                    <Button type="primary" icon={<PlusOutlined />} onClick={openAddTaskModal}>
                        Add Task
                    </Button>
                    <Typography.Link onClick={openManageTagsDrawer}>
                        Manage Tags
                    </Typography.Link>
                </Flex>

                <Flex gap="small" vertical>
                    <TasksList />
                </Flex>

                <AddTaskModal
                    isOpen={isAddTaskModalOpen}
                    onClose={closeAddTaskModal}
                />
                <TagsManagerDrawer
                    isOpen={isManageTagsDrawerOpen}
                    onClose={closeManageDrawerDrawer}
                />
            </Flex>
        </Layout.Content>
    );
}