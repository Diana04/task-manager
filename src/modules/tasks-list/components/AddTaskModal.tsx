import { Form, Input, Modal, Select } from 'antd';

import { useTasksStore } from '../store';

type TaskFormFields = {
    name: string;
    tags?: string[];
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export const AddTaskModal = ({isOpen, onClose}: Props) => {
    const addTask = useTasksStore(state => state.addTask);
    const tags = useTasksStore(state => state.tags);
    const [form] = Form.useForm();

    const handleSaveModalData = () => {
        // TODO: rewrite
        form.validateFields()
            .then(() => {
                const {name, tags} = form.getFieldsValue();

                addTask(name, tags)
                onClose();
                form.resetFields();
            })
            .catch(() => {})
    }

    return (<>
        <Modal
            title="Add Task"
            open={isOpen}
            onOk={handleSaveModalData}
            onCancel={onClose}
            okText="Add"
        >
            <Form form={form} layout="vertical">
                <Form.Item<TaskFormFields>
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please add task name' }]}
                >
                    <Input placeholder="Enter task name" />
                </Form.Item>

                <Form.Item<TaskFormFields>
                    label="Tags"
                    name="tags"
                >
                    <Select
                        mode="multiple"
                        placeholder="Select tags"
                    >
                        {tags?.length > 0 && tags.map((tag) => (
                            <Select.Option value={tag.id} key={tag.id}>
                                {tag.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    </>);
}