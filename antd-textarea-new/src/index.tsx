import * as React from 'react';
import ResizableTextArea, { AutoSizeType } from './ResizableTextArea';

export type HTMLTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// 定义接口（继承自长文本组件,Props指定数据类型）
export interface TextAreaProps extends HTMLTextareaProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  autoSize?: boolean | AutoSizeType;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onResize?: (size: { width: number; height: number }) => void;
}

// 定义接口（State是null）
export interface TextAreaState {
  value: any;
}

// 文本输入框类（继承自上面的StateProps）
class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  // 类属性
  resizableTextArea!: ResizableTextArea;

  // 构造器传参验证
  constructor(props: TextAreaProps) {
    super(props);
    const value = typeof props.value === 'undefined' || props.value === null ? props.defaultValue : props.value;
    this.state = {
      value,
    };
  }

  // TS + React（获取新Value是更新状态）
  static getDerivedStateFromProps(nextProps: TextAreaProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  // 设置值，并执行回调函数
  setValue(value: string, callback?: () => void) {
    if (!('value' in this.props)) {
      this.setState({ value }, callback);
    }
  }

  // 获取焦点、失去焦点
  focus = () => {
    this.resizableTextArea.textArea.focus();
  }
  blur() {
    this.resizableTextArea.textArea.blur();
  }

  // 保存
  saveTextArea = (resizableTextArea: ResizableTextArea) => {
    this.resizableTextArea = resizableTextArea;
  };

  // 内容变化后的回调函数
  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    this.setValue(e.target.value, () => {
      this.resizableTextArea.resizeTextarea();
    });
    if (onChange) {
      onChange(e);
    }
  };

  // 处理键盘事件
  handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  render() {
    return (
      <ResizableTextArea
        {...this.props}
        value={this.state.value}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        ref={this.saveTextArea}
      />
    );
  }
}

export { ResizableTextArea, AutoSizeType };

export default TextArea;
