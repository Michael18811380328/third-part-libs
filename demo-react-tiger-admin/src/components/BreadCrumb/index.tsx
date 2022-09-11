import { Breadcrumb } from 'antd';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import './index.less';

// 面包屑组件（从 store 中获取到 menuList 进行渲染）
const BreadCrumb = () => {
  const { appStore } = useStore()
  const { currentMenuList } = appStore
  const extraBreadcrumbItems = currentMenuList?.map((item: any) => {
    return (
      <Breadcrumb.Item key={item.path}>
        {item.title}
      </Breadcrumb.Item>
    );
  });
  // 外部自定义了样式（行高）
  return (
    <div className="app-breadcrumb">
      <Breadcrumb style={{ lineHeight: '64px'}}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    </div>
  );
}

export default observer(BreadCrumb);
