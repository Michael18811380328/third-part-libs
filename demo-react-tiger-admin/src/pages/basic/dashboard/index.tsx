import React from 'react';
import { Card, Col, Descriptions, Row, Space, Statistic, Tabs } from 'antd';
import { FundOutlined, LikeOutlined, RiseOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useStorage } from '@/hooks/common';
import OrderList from './order-list';

const { TabPane } = Tabs;
const { Item } = Descriptions;

// 仪表盘组件
const Dashboard: React.FC = () => {
  const storage = useStorage();
  const { nickname, address, email, qq, createTime, signature } = storage.get({ path: 'info' });

  function onTabChange(key: string) {
    console.log(key);
    // todo: change tab
  }

  return (
    <>
      <Space direction="vertical" size={20}>
        <Card title={'项目信息'}>
          <Descriptions size="small" column={2}>
            <Item label="创建人">{nickname}</Item>
            <Item label="联系方式">{email}</Item>
            <Item label="QQ 群">{qq}</Item>
            <Item label="更新时间">{address}</Item>
            <Item label="签名">{signature}</Item>
          </Descriptions>
        </Card>
        <Card>
          <Row gutter={16}>
            <Col span={6}><Statistic title="总成交" value={1128} prefix={<RiseOutlined />} /></Col>
            <Col span={6}><Statistic title="活跃用户" value={93} prefix={<UsergroupAddOutlined />} /></Col>
            <Col span={6}><Statistic title="订单" value={1128} prefix={<LikeOutlined />} /></Col>
            <Col span={6}><Statistic title="总销量" value={93} prefix={<FundOutlined />} /></Col>
          </Row>
        </Card>
        <Card>
          <Tabs defaultActiveKey="1" onChange={onTabChange}>
          <TabPane tab="订单管理" key="1">
            <OrderList />
          </TabPane>
          <TabPane tab="配送管理" key="2">
            未来会增加这个模块
          </TabPane>
          <TabPane tab="售后管理" key="3">
           未来会增加这个模块
          </TabPane>
          </Tabs>
        </Card>
      </Space>
    </>
  );
}

export default Dashboard;
