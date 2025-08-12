import { memo } from 'react';
import { Card, Flex, Tag, Typography } from 'antd';

import { filterTaskTagsByIds } from '../helpers';
import { useTasksStore } from '../store';
import type { TagId } from '../types';
import { URGENT_TASK_ID } from '../constants';

type Props = {
    title: string;
    tagIds: TagId[];
};

export const TaskCard = memo(({
    title,
    tagIds,
}: Props) => {
    const tags = useTasksStore(state => state.tags);
    const cardTags = filterTaskTagsByIds(tagIds, tags);
    const isUrgent = tagIds.includes(URGENT_TASK_ID);

    return (
        <Card
            size="small"
            style={{ background: isUrgent ? '#fff1f0' : 'transparent'}}
        >
            <Flex vertical gap="small">
                <Typography.Title level={5} style={{ margin: 0 }}>
                    {title}
                </Typography.Title>

                {cardTags?.length > 0 && <Flex gap="4px 0" wrap>
                    {cardTags.map((tag) => (
                        <Tag color={tag.color} key={tag.id} bordered={false}>
                            {tag.title}
                        </Tag>
                    ))}
                </Flex>}
            </Flex>
        </Card>
    )
});
