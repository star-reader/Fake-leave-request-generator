import { Form, Input, Button, DatePicker, Select, TimePicker, Space } from 'antd'; // Changed from antd-mobile to antd
import React from 'react'; // Added React import
import dayjs from 'dayjs';
import styles from './Form.module.css'; // Import CSS module
import hospitalCityMap from '../../config/hospitalByCity.ts';

const { Option } = Select; // Destructure Option from Select

interface FormProps {
    name: string;
    date: string;
    timeSlot: string;
    department: string;
    hospital: string;
    onNameChange: (name: string) => void;
    onDateChange: (date: string) => void;
    onTimeSlotChange: (timeSlot: string) => void;
    onDepartmentChange: (department: string) => void;
    onHospitalChange: (hospital: string) => void;
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
    hospital,
    onNameChange,
    onDateChange,
    onTimeSlotChange,
    onDepartmentChange,
    onHospitalChange,
    onSubmit
}: FormProps) => {
    const [form] = Form.useForm();
    const [useCustomHospital, setUseCustomHospital] = React.useState(false);
    const [selectedCity, setSelectedCity] = React.useState<string | undefined>(undefined);
    const [useCustomTimeRange, setUseCustomTimeRange] = React.useState(false);
    
    const parseTimeSlotToRange = (slot: string | undefined) => {
        if (!slot) return null;
        const parts = slot.split('-');
        if (parts.length !== 2) return null;
        const [start, end] = parts;
        const s = dayjs(start, 'HH:mm');
        const e = dayjs(end, 'HH:mm');
        if (!s.isValid() || !e.isValid()) return null;
        return [s, e] as [dayjs.Dayjs, dayjs.Dayjs];
    };

    const cities = React.useMemo(() => Object.keys(hospitalCityMap) as string[], []);
    const hospitalsInCity = React.useMemo(() => (
        selectedCity ? hospitalCityMap[selectedCity] ?? [] : []
    ), [selectedCity]);

    const disabledDate = (current: dayjs.Dayjs) => {
        return !!current && current.isBefore(dayjs().startOf('day'));
    };

    const handleAntdSubmit = () => {
        onSubmit(); 
    };

    React.useEffect(() => {
        form.setFieldsValue({
            name,
            date: date ? dayjs(date) : null,
            timeRange: parseTimeSlotToRange(timeSlot),
            timeSlot: timeSlot || undefined,
            department,
            hospital,
        });
    }, [name, date, timeSlot, department, hospital, form]);

    React.useEffect(() => {
        if (hospital) {
            for (const [city, list] of Object.entries(hospitalCityMap) as [string, string[]][]) {
                if (list.includes(hospital)) {
                    setSelectedCity(city);
                    break;
                }
            }
        }
    }, [hospital]);

    return (
        <div className={styles.formContainer}>
            <Form
                form={form}
                layout='vertical'
                onFinish={handleAntdSubmit}
                initialValues={{
                    name,
                    date: date ? dayjs(date) : undefined,
                    timeRange: parseTimeSlotToRange(timeSlot) ?? undefined,
                    department,
                    hospital,
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
                    label='医院'
                    name='hospital'
                    rules={[{ required: true, message: '请选择医院!' }]}
                    extra={<Button type='link' size='small' onClick={() => setUseCustomHospital(v => !v)}>
                        {useCustomHospital ? '切换为列表选择' : '手动输入'}
                    </Button>}
                >
                    {useCustomHospital ? (
                        <Input
                            placeholder='请输入医院名称'
                            onChange={(e) => onHospitalChange(e.target.value)}
                            allowClear
                        />
                    ) : (
                        <Space>
                            <Select
                                placeholder='选择城市'
                                value={selectedCity}
                                showSearch
                                onChange={(value) => {
                                    setSelectedCity(value as string);
                                }}
                                style={{ minWidth: 140 }}
                                filterOption={(input, option) => ((option?.value as string) || '').toLowerCase().includes(input.toLowerCase())}
                            >
                                {cities.map(city => (
                                    <Option key={city} value={city}>{city}</Option>
                                ))}
                            </Select>
                            <Select
                                placeholder='选择医院'
                                disabled={!selectedCity}
                                showSearch
                                onChange={(value) => {
                                    const selected = value as string;
                                    onHospitalChange(selected);
                                    form.setFieldsValue({ hospital: selected });
                                }}
                                style={{ minWidth: 220 }}
                                filterOption={(input, option) => ((option?.value as string) || '').toLowerCase().includes(input.toLowerCase())}
                                value={hospital && hospitalsInCity.includes(hospital) ? hospital : undefined}
                            >
                                {hospitalsInCity.map(h => (
                                    <Option key={h} value={h}>{h}</Option>
                                ))}
                            </Select>
                        </Space>
                    )}
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

                {!useCustomTimeRange && (
                    <Form.Item
                        label='选择时间段'
                        name='timeSlot'
                        rules={[{ required: true, message: '请选择时间段!' }]}
                        extra={<Button type='link' size='small' onClick={() => setUseCustomTimeRange(true)}>
                            自定义时段
                        </Button>}
                    >
                        <Select
                            placeholder='请选择时间段'
                            onChange={(value) => {
                                const v = value as string;
                                onTimeSlotChange(v);
                                const range = parseTimeSlotToRange(v);
                                form.setFieldsValue({ timeRange: range, timeSlot: v });
                            }}
                        >
                            {timeSlots.map(slot => (
                                <Option key={slot.value} value={slot.value}>{slot.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                {useCustomTimeRange && (
                    <Form.Item
                        label='自定义时间范围'
                        name='timeRange'
                        rules={[{ required: true, message: '请选择时间范围!' }]}
                        extra={<Button type='link' size='small' onClick={() => setUseCustomTimeRange(false)}>
                            切换为时段选择
                        </Button>}
                    >
                        <TimePicker.RangePicker
                            format='HH:mm'
                            minuteStep={5}
                            onChange={(_, formatStrings) => {
                                const [s, e] = formatStrings as [string, string];
                                const val = s && e ? `${s}-${e}` : '';
                                onTimeSlotChange(val);
                                form.setFieldsValue({ timeSlot: val || undefined, timeRange: s && e ? [dayjs(s, 'HH:mm'), dayjs(e, 'HH:mm')] : null });
                            }}
                        />
                    </Form.Item>
                )}

                <Form.Item>
                    <Button type='primary' htmlType='submit' block size='large' className={styles.submitButton}>
                        生成挂号单
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};