import { ProjectName } from '@/common/constants';

// 这是全局使用的工具函数
// 验证 key 是否有效（Object 是否有这个 key）
export function isValidKey(key: string|number|symbol, obj: object): key is keyof typeof obj {
  return key in obj;
}

// 获取 URL 查询参数
export function getQueryString() {
  const regexp = /([^&=]+)=([^&]*)/g;
  const result: any = {};
  let match: any = '';
  const { search, hash } = window.location;
  const questString = search.substring(1) || hash.split('?')[1];
  // eslint-disable-next-line no-cond-assign
  while ((match = regexp.exec(questString))) {
    result[decodeURIComponent(match[1]) as string] = decodeURIComponent(match[2]);
  }
  return result;
}

// 把 routers 树，flat 转换成数组
export function flatRouters(routes: any) {
  function getRouters(menu: any) {
    menu.forEach((item: any) => {
      if (item.children) {
        getRouters(item.children);
      } else {
        menus.push(item);
      }
    });
  }
  const menus: any = [];
  getRouters(routes);
  return menus;
}

// 获取页面的标题（页面名+项目名）
export function setPageTitle(titleText: string) {
  document.title = `${titleText || ''} - ${ProjectName}`;
}
