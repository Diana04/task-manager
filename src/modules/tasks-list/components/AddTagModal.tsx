import { ColorPicker, Form, Input, Modal } from 'antd';
import type { AggregationColor } from 'antd/es/color-picker/color';

import { useTasksStore } from '../store';

type TaskFormFields = {
    name: string;
    color: AggregationColor;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export const AddTagModal = ({isOpen, onClose}: Props) => {
    const addTag = useTasksStore(state => state.addTag);
    const [form] = Form.useForm<TaskFormFields>();

    const handleSaveModalData = () => {
        // TODO: rewrite
        form.validateFields()
            .then(() => {
                const {name, color} = form.getFieldsValue();

                addTag(name, color.toHexString())
                onClose();
                form.resetFields();
            })
            .catch(() => {})
    }

    return (
        <Modal
            title="Add Tag"
            open={isOpen}
            onOk={handleSaveModalData}
            onCancel={onClose}
            okText="Add"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please add tag name' }]}
                >
                    <Input placeholder="Enter tag name" />
                </Form.Item>

                <Form.Item
                    label="Color"
                    name="color"
                    rules={[{ required: true, message: 'Please add tag color' }]}
                >
                    <ColorPicker size="small" format="hex" />
                </Form.Item>
            </Form>
        </Modal>
    );
}