import React from 'react';
import { Layout, Button, Typography, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './Header.module.css';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
    title: string;
    onBack?: () => void;
}

const CustomHeader: React.FC<HeaderProps> = ({ title, onBack }) => {
    return (
        <AntHeader className={styles.appHeader}>
            <Space align="center" style={{ width: '100%' }}>
                {onBack && (
                    <Button 
                        type="text" 
                        icon={<ArrowLeftOutlined />} 
                        onClick={onBack} 
                        className={styles.backButton}
                    />
                )}
                <Title level={4} className={styles.headerTitle} style={{ margin: 0, flexGrow: 1, textAlign: onBack ? 'left' : 'center' }}>
                    {title}
                </Title>
                {/* Placeholder for potential right-side actions if back button exists to balance layout */}
                {onBack && <div style={{ width: '40px' }} />}
            </Space>
        </AntHeader>
    );
};

export default CustomHeader;