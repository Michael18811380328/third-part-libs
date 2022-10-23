// 时间选择框（原来是 github 开源的，现在找不到了）
// https://ant.design/components/time-picker-cn/
/* eslint jsx-a11y/no-noninteractive-element-to-interactive-role: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import classNames from 'classnames';
import raf from 'raf';
// https://www.npmjs.com/package/raf
// requestAnimationFrame polyfill for node and the browser.
// raf(() => { raf(); });

/**
 * 辅助函数：设置某个元素的滚动位置
 * @param {dom} element 移动的元素
 * @param {number} to 移动到的位置
 * @param {number} duration 移动的时间
 */
const scrollTo = (element, to, duration) => {
  // 如果时间是0，直接移动到目标位置
  if (duration <= 0) {
    raf(() => {
      element.scrollTop = to;
    });
    return;
  }
  // 如果时间不是0
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;
  // 计算移动的间隔
  raf(() => {
    element.scrollTop += perTick;
    if (element.scrollop === to) {
      return;
    }
    // 递归滚动函数
    scrollTo(element, to, duration - 10);
  });
}

// 选择器类
class Select extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    options: PropTypes.array,
    selectedIndex: PropTypes.number,
    type: PropTypes.string,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onEsc: PropTypes.func,
  };

  state = {
    active: false,
  };

  componentDidMount() {
    // 跳转到选中的选项，参数是时间 duration
    this.scrollToSelected(0);
  }

  // 在组件更新后，如果选中选项不一致，跳转到这个选项
  componentDidUpdate(prevProps) {
    const { selectedIndex } = this.props;
    // 为了用户体验，平滑的滚动到选中的选项
    if (selectedIndex !== prevProps.selectedIndex) {
      this.scrollToSelected(120);
    }
  }

  // 选中选项后的回调函数
  onSelect = value => {
    const { onSelect, type } = this.props;
    onSelect(type, value);
  }

  // 渲染选项列表
  getOptions = () => {
    const { options, selectedIndex, prefixCls, onEsc } = this.props;
    return options.map((item, index) => {
      const cls = classNames({
        [`${prefixCls}-select-option-selected`]: selectedIndex === index,
        [`${prefixCls}-select-option-disabled`]: item.disabled,
      });
      // 这里直接动态设置回调函数
      // 每次render都会创建并执行函数，这里最好写成组件的函数
      const onClick = item.disabled ? undefined : () => {
        this.onSelect(item.value);
      };
      // 
      const onKeyDown = (e) => {
        if (e.keyCode === 13) onClick();
        else if (e.keyCode === 27) onEsc();
      };
      return (
        <li
          role="button"
          // role 用在屏幕阅读器，参考
          // https://blog.csdn.net/annip/article/details/53455226
          className={cls}
          key={index}
          disabled={item.disabled}
          tabIndex="0"
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          {item.value}
        </li>
      );
    });
  }

  // 处理鼠标事件
  handleMouseEnter = e => {
    const { onMouseEnter } = this.props;
    this.setState({ active: true });
    onMouseEnter(e);
  }

  handleMouseLeave = () => {
    this.setState({ active: false });
  }

  // 保存节点到类属性中
  saveList = node => {
    this.list = node;
  }

  // 滚动到选中的选项
  scrollToSelected(duration) {
    const { selectedIndex } = this.props;
    const select = ReactDom.findDOMNode(this);
    const list = ReactDom.findDOMNode(this.list);
    if (!list) return;
    let index = selectedIndex;
    if (index < 0) index = 0;
    const topOption = list.children[index];
    const to = topOption.offsetTop;
    this.scrollTo(select, to, duration); 
  }

  render() {
    const { prefixCls, options } = this.props;
    const { active } = this.state;
    if (options.length === 0) {
      return null;
    }
    const cls = classNames(
      `${prefixCls}-select`,
      {[`${prefixCls}-select-active`]: active},
    );
    return (
      <div
        className={cls}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ul ref={this.saveList}>
          {this.getOptions()}
        </ul>
      </div>
    );
  }
}

export default Select;
