import React from 'react';
import { Button, Radio, Space, Typography, Alert } from 'antd';
import styles from './SelectionPage.module.css';

const { Title, Text } = Typography;

interface SelectionPageProps {
  onConfirm: (type: string) => void;
}

const SelectionPage: React.FC<SelectionPageProps> = ({ onConfirm }) => {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);

  const handleConfirm = () => {
    if (selectedValue) {
      onConfirm(selectedValue);
    }
  };

  return (
    <div className={styles.container}>
      <Alert
        message="重要提示"
        description="本应用生成的凭证仅供娱乐或概念演示，请勿用于任何非法用途。任何滥用行为由用户自行承担责任。"
        type="warning"
        showIcon
        closable
        className={styles.warningAlert}
      />
      <Title level={3} className={styles.title}>请选择凭证类型</Title>
      <Radio.Group 
        onChange={(e) => setSelectedValue(e.target.value)} 
        value={selectedValue}
        className={styles.radioGroup}
      >
        <Space direction="vertical" size="large">
          <Radio value="registrationSlip" className={styles.radioOption}>
            挂号单
          </Radio>
          {/* Future options can be added here */}
        </Space>
      </Radio.Group>
      <Text type="secondary" className={styles.moreFeaturesText}>
        更多功能开发中，敬请期待...
      </Text>
      <Button 
        type="primary" 
        onClick={handleConfirm} 
        disabled={!selectedValue}
        className={styles.confirmButton}
        size="large"
      >
        确认
      </Button>
    </div>
  );
};

export default SelectionPage;