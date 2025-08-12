import { useCallback } from 'react';
import { useShallow } from 'zustand/shallow';
import { Checkbox, Flex, Typography } from 'antd';
import styled from 'styled-components';

import { useTasksStore } from '../store';

const StyledTypographyTitle = styled(Typography.Title)`
  margin: 0 !important;
`;

export const TasksFilters = () => {
    const {taskTags, activeFilters, setActiveFilters} = useTasksStore(useShallow(state => ({
        taskTags: state.tags,
        activeFilters: state.activeFilters,
        setActiveFilters: state.setActiveFilters,
    })));
    
    const handleChange = useCallback((tagIds: string[]) => {
        setActiveFilters({ tagIds })
    }, [setActiveFilters]);

    return (
        <Flex gap="small" vertical>
            <StyledTypographyTitle level={5}>Filters</StyledTypographyTitle>
            <Flex gap="middle">
                <Checkbox.Group onChange={handleChange} value={activeFilters.tagIds}>
                    {taskTags && taskTags.map((tag) => (
                        <Checkbox value={tag.id} key={tag.id}>
                            {tag.title}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </Flex>
        </Flex>
    );
}