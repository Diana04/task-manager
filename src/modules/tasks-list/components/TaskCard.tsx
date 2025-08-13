import { memo } from 'react';
import { Card, Flex, Tag, Typography } from 'antd';

import { filterTaskTagsByIds, getIsTaskUrgent } from '../helpers';
import { useTasksStore } from '../store';
import type { TagId } from '../types';
import styled from 'styled-components';

const StyledCard = styled(Card)`
    border: none;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
        0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    border-left: ${props =>
        props.variant === 'outlined' ? '4px solid #ff7875' : 'none'};
`;

type Props = {
    title: string;
    tagIds: TagId[];
};

export const TaskCard = memo(({ title, tagIds }: Props) => {
    const tags = useTasksStore(state => state.tags);
    const cardTags = filterTaskTagsByIds(tagIds, tags);
    const isUrgent = getIsTaskUrgent(tagIds);

    return (
        <StyledCard size="small" variant={isUrgent ? 'outlined' : 'borderless'}>
            <Flex vertical gap="small">
                <Typography.Title level={5} style={{ margin: 0 }}>
                    {title}
                </Typography.Title>

                {cardTags?.length > 0 && (
                    <Flex gap="4px 0" wrap>
                        {cardTags.map(tag => (
                            <Tag
                                color={tag.color}
                                key={tag.id}
                                bordered={false}
                            >
                                {tag.title}
                            </Tag>
                        ))}
                    </Flex>
                )}
            </Flex>
        </StyledCard>
    );
});
