import { Form, Input, Button, DatePicker, Select } from 'antd'; // Changed from antd-mobile to antd
import React from 'react'; // Added React import
import moment from 'moment';
import styles from './Form.module.css'; // Import CSS module

const { Option } = Select; // Destructure Option from Select

interface FormProps {
    name: string;
    date: string;
    timeSlot: string;
    department: string;
    onNameChange: (name: string) => void;
    onDateChange: (date: string) => void;
    onTimeSlotChange: (timeSlot: string) => void;
    onDepartmentChange: (department: string) => void;
    onSubmit: () => void;
}

const departments = [
    { label: '内科', value: '内科' },
    { label: '外科', value: '外科' },
    { label: '儿科', value: '儿科' },
    { label: '妇产科', value: '妇产科' },
    { label: '眼科', value: '眼科' },
    { label: '耳鼻喉科', value: '耳鼻喉科' },
    { label: '口腔科', value: '口腔科' },
    { label: '皮肤科', value: '皮肤科' },
    { label: '精神科', value: '精神科' },
    { label: '肿瘤科', value: '肿瘤科' },
];

const timeSlots = [
    { label: '08:00-09:00', value: '08:00-09:00' },
    { label: '09:00-10:00', value: '09:00-10:00' },
    { label: '10:00-11:00', value: '10:00-11:00' },
    { label: '11:00-12:00', value: '11:00-12:00' },
    { label: '13:00-14:00', value: '13:00-14:00' },
    { label: '14:00-15:00', value: '14:00-15:00' },
    { label: '15:00-16:00', value: '15:00-16:00' },
    { label: '16:00-17:00', value: '16:00-17:00' },
];

export default ({
    name,
    date,
    timeSlot,
    department,
    onNameChange,
    onDateChange,
    onTimeSlotChange,
    onDepartmentChange,
    onSubmit
}: FormProps) => {
    const [form] = Form.useForm();

    const disabledDate = (current: any) => {
        return current && current < new Date().setHours(0, 0, 0, 0);
    };

    const handleAntdSubmit = () => {
        onSubmit(); 
    };

    React.useEffect(() => {
        form.setFieldsValue({
            name,
            date: date ? moment(date) : null,
            timeSlot,
            department,
        });
    }, [name, date, timeSlot, department, form]);

    return (
        <div className={styles.formContainer}>
            <Form
                form={form}
                layout='vertical'
                onFinish={handleAntdSubmit} // Use antd's onFinish
                initialValues={{
                    name,
                    // antd DatePicker expects a moment object for initialValue if date is pre-filled
                    date: date ? moment(date) : undefined,
                    timeSlot,
                    department,
                }}
            >
                <Form.Item
                    label='姓名'
                    name='name'
                    rules={[{ required: true, message: '姓名不能为空!' }]}
                >
                    <Input
                        placeholder='请输入您的姓名'
                        onChange={(e) => onNameChange(e.target.value)}
                        allowClear // antd Input uses allowClear
                    />
                </Form.Item>

                <Form.Item
                    label='挂号日期'
                    name='date'
                    rules={[{ required: true, message: '请选择挂号日期!' }]}
                >
                    <DatePicker
                        placeholder='请选择日期'
                        onChange={(_, dateString) => onDateChange(dateString as string)}
                        disabledDate={disabledDate}
                        // value prop is managed by Form.Item
                    />
                </Form.Item>

                <Form.Item
                    label='选择科室'
                    name='department'
                    rules={[{ required: true, message: '请选择科室!' }]}
                >
                    <Select
                        placeholder='请选择科室'
                        onChange={(value) => onDepartmentChange(value as string)}
                        // value prop is managed by Form.Item
                    >
                        {departments.map(dept => (
                            <Option key={dept.value} value={dept.value}>{dept.label}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label='选择时间段'
                    name='timeSlot'
                    rules={[{ required: true, message: '请选择时间段!' }]}
                >
                    <Select
                        placeholder='请选择时间段'
                        onChange={(value) => onTimeSlotChange(value as string)}
                        // value prop is managed by Form.Item
                    >
                        {timeSlots.map(slot => (
                            <Option key={slot.value} value={slot.value}>{slot.label}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' block size='large' className={styles.submitButton}>
                        生成挂号单
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};