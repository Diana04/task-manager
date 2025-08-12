import { useState } from 'react';
import { Button, Drawer, List, Tag } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { useTasksStore } from '../store';
import { AddTagModal } from './AddTagModal';

const StyledButton = styled(Button)`
    background-color: ${props => props.type === 'text' ? '#f5f5f5' : '#1677ff'};
    border-color: transparent !important;
    outline: none !important;

    &:hover {
        background-color: ${props => props.type === 'text' ? '#d9d9d9' : '#1677ff'};
    }
`;

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export const TagsManagerDrawer = ({isOpen, onClose}: Props) => {
    const removeTag = useTasksStore(state => state.removeTag);
    const tags = useTasksStore(state => state.tags);

    const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);

    const openAddTagModal = () => {
        setIsAddTagModalOpen(true);
    }

    const closeAddTagModal = () => {
        setIsAddTagModalOpen(false);
    }

    return (<>
        <Drawer
            title="Manage Tags"
            open={isOpen}
            onClose={onClose}
            footer={
                <Button type="primary" icon={<PlusOutlined />} onClick={openAddTagModal}>
                    Add New Tag
                </Button>
            }
        >
            <List>
                {tags.map(tag => (
                    <List.Item key={tag.id}>
                        <Tag color={tag.color} key={tag.id} bordered={false}>
                            {tag.title}
                        </Tag>
                        <StyledButton
                            shape="circle"
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => removeTag(tag.id)}
                        />
                    </List.Item>
                ))}
            </List>
        </Drawer>
        <AddTagModal isOpen={isAddTagModalOpen} onClose={closeAddTagModal} />
    </>);
}