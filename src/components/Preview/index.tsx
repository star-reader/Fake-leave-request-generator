import { Card, List, Tag, Grid, Space, Button } from 'antd-mobile';
import { AntOutline, SmileOutline, UserCircleOutline, CalendarOutline, ClockCircleOutline, EnvironmentOutline, ShopbagOutline } from 'antd-mobile-icons';
import styles from './Preview.module.css';
import BatteryImage from '../../assets/battery.jpg'
import _doctorName from '../../config/name';
import place from '../../config/place';

// Helper function to format date
const formatDate = (dateString: string) => {
    if (!dateString) return '未指定';
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekDay = weekDays[dateObj.getDay()];
    return `${year}年${month}月${day}日 ${weekDay}`;
};

export default ({ name, date, timeSlot, department }: {
    name: string;
    date: string;
    timeSlot: string;
    department: string;
}) => {
    const hospitalName = "中山大学附属第一医院";
    let randomNumIndex = Math.floor(Math.random() * 100);
    let placeNumIndex = Math.floor(Math.random() * 10);
    const doctorName = _doctorName[randomNumIndex];
    const registrationFee = "25.00 元";
    const paymentStatus = "已支付";
    const clinicLocation = place[placeNumIndex];

    // Get current time for the status bar
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    return (
        <div className={styles.iphoneContainer}>
            <div className={styles.dynamicIsland}></div>
            <div id='phone-body'>
                <div className={styles.statusBar}>
                    <span className={styles.time}>{currentTime}</span>
                    <div className={styles.statusIcons}>
                        <img src={BatteryImage} alt="battery image" />
                    </div>
                </div>
                <div className={styles.iphoneScreen}> {/* Changed from appContent to iphoneScreen to match CSS for scrolling etc. */}
                    {/* The rest of the content will be wrapped by iphoneScreen */}
                    <Card
                        title={<Space align='center'><AntOutline /> {hospitalName} - 电子挂号单</Space>}
                        className={styles.previewCard}
                    >
                        <List mode='card'>
                            <List.Item prefix={<UserCircleOutline />} extra={<Tag color='primary'>{name}</Tag>}>
                                患者姓名
                            </List.Item>
                            <List.Item prefix={<CalendarOutline />} extra={formatDate(date)}>
                                就诊日期
                            </List.Item>
                            <List.Item prefix={<ClockCircleOutline />} extra={timeSlot}>
                                预约时段
                            </List.Item>
                            <List.Item prefix={<ShopbagOutline />} extra={department}>
                                挂号科室
                            </List.Item>
                            <List.Item prefix={<SmileOutline />} extra={doctorName}>
                                预约医生
                            </List.Item>
                            <List.Item prefix={<EnvironmentOutline />} extra={clinicLocation}>
                                就诊地点
                            </List.Item>
                            <List.Item>
                                挂号单号
                            </List.Item>
                            <List.Item extra={<Tag color='success'>{paymentStatus}</Tag>}>
                                支付状态
                            </List.Item>
                            <List.Item extra={<Tag color='warning' fill='outline'>{registrationFee}</Tag>}>
                                挂号费用
                            </List.Item>
                        </List>

                        <div className={styles.notes}>
                            <h4>温馨提示：</h4>
                            <p>1. 请您于预约时间前15分钟到达指定就诊地点，凭此电子挂号单和有效身份证件取号候诊。</p>
                            <p>2. 如需取消或更改预约，请至少在就诊前2小时通过官方App或小程序操作。</p>
                            <p>3. 过号将视为自动放弃，如需继续就诊，请重新挂号。</p>
                        </div>

                        <Grid columns={2} gap={8} className={styles.actionButtons}>
                            <Grid.Item>
                                <Button block color='primary' fill='outline'>查看路线</Button>
                            </Grid.Item>
                            <Grid.Item>
                                <Button className="adm-button adm-button-block adm-button-outline adm-button-success">联系客服</Button>
                            </Grid.Item>
                        </Grid>
                    </Card>
                    {/* Closing iphoneScreen div */}
                </div> 
            </div>
        </div>
    );
};