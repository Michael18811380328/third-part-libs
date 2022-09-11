import { action, makeObservable, observable } from 'mobx';

// 应用状态管理
class App {

  constructor() {
    makeObservable(this);
  }

  // 修饰器的功能未来可能更改
  @observable menus = []

  @observable currentMenuList = []

  @observable theme = 'light'

  @observable collapsed = false

  // 设置菜单当前的列表
  @action setCurrentMenuList = (list: any) => {
    this.currentMenuList = list;
  }

  // 设置菜单折叠状态
  @action setCollapsed = (type: boolean) => {
    this.collapsed = type;
  }
}

export default new App();
