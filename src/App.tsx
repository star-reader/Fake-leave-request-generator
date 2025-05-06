import { useState, useEffect } from 'react';
import { ConfigProvider as AntdMobileConfigProvider } from 'antd-mobile';
import { ConfigProvider as AntdConfigProvider, Layout, Alert, Button, Typography } from 'antd';
import enUS_am from 'antd-mobile/es/locales/en-US';
import FormComponent from './components/Form';
import Preview from './components/Preview';
import HeaderComponent from './components/Header'; // Renamed to avoid conflict
import SelectionPage from './components/SelectionPage/SelectionPage';
import styles from './App.module.css';
import { DownloadOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';

const { Content } = Layout;
const { Paragraph, Title } = Typography;

export interface FormDataState {
  name: string;
  date: string;
  timeSlot: string;
  department: string;
}

type AppStep = 'selection' | 'form' | 'preview';

export default () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    date: '',
    timeSlot: '',
    department: ''
  });
  const [currentStep, setCurrentStep] = useState<AppStep>('selection');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTypeConfirm = (type: string) => {
    setSelectedType(type);
    setCurrentStep('form');
  };

  const handleSubmit = () => {
    if (formData.name && formData.date && formData.timeSlot && formData.department) {
      setCurrentStep('preview');
    } else {
      console.log("Form data is incomplete");
    }
  };

  const handleBack = () => {
    if (currentStep === 'preview') {
      setCurrentStep('form');
    } else if (currentStep === 'form') {
      setCurrentStep('selection');
      setSelectedType(null); // Reset selected type
    }
  };

  const handleSaveAsImage = async () => {
    const previewElement = document.getElementById('phone-body');
    if (previewElement) {
      try {
        const canvas = await html2canvas(previewElement, {
          allowTaint: true,
          useCORS: true,
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `${selectedType || 'preview'}-${formData.name || 'ticket'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error saving image:', error);
        alert('图片保存失败，请查看控制台获取更多信息。');
      }
    }
  };

  const getHeaderTitle = () => {
    if (currentStep === 'selection') return "虚拟请假条生成器";
    if (currentStep === 'form') return selectedType === 'registrationSlip' ? "在线预约挂号" : "填写信息";
    if (currentStep === 'preview') return selectedType === 'registrationSlip' ? "挂号单预览" : "凭证预览";
    return "凭证生成器";
  };

  const renderContent = () => {
    if (currentStep === 'selection') {
      return <SelectionPage onConfirm={handleTypeConfirm} />;
    }
    if (currentStep === 'form') {
      return (
        <FormComponent
          {...formData}
          onNameChange={(name: string) => setFormData({ ...formData, name })}
          onDateChange={(dateString) => setFormData({ ...formData, date: dateString })}
          onTimeSlotChange={(timeSlot) => setFormData({ ...formData, timeSlot })}
          onDepartmentChange={(department) => setFormData({ ...formData, department })}
          onSubmit={handleSubmit}
        />
      );
    }
    if (currentStep === 'preview') {
      const previewAndControls = (
        <div className={styles.previewLayout}>
          <div className={styles.previewPane} id="iphone-preview-area">
            <Preview {...formData} />
          </div>
          <div className={styles.controlsPane}>
            <Title level={4}>操作与说明</Title>
            <Paragraph>
              请仔细核对预览信息。下方按钮可将当前预览保存为图片。
            </Paragraph>
            <Paragraph type="danger">
              <strong>重要提示：</strong> 本应用生成的凭证仅供娱乐或概念演示，请勿用于任何非法用途。任何滥用行为由用户自行承担责任。
            </Paragraph>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleSaveAsImage}
              block
              size="large"
            >
              保存为图片
            </Button>
          </div>
        </div>
      );
      return isMobile ? (
        <div className={styles.fullPageContent}>
          {previewAndControls}
        </div>
      ) : previewAndControls;
    }
    return null;
  };

  return (
    <AntdConfigProvider>
      <AntdMobileConfigProvider locale={enUS_am}>
        <Layout className={styles.appContainer}>
          <HeaderComponent
            title={getHeaderTitle()}
            onBack={currentStep !== 'selection' ? handleBack : undefined}
          />
          <Content className={styles.contentArea}>
            {currentStep !== 'selection' && currentStep !== 'preview' && (
              <Alert
                message="重要提示"
                description="本应用生成的凭证仅供娱乐或概念演示，请勿用于任何非法用途。任何滥用行为由用户自行承担责任。"
                type="warning"
                showIcon
                style={{ margin: '16px auto', maxWidth: '600px' }}
              />
            )}
            {renderContent()}
          </Content>
        </Layout>
      </AntdMobileConfigProvider>
    </AntdConfigProvider>
  );
};