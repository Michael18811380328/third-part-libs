import * as React from 'react';
import ResizeObserver from 'rc-resize-observer';
import omit from 'omit.js';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';
import { TextAreaProps } from '.';

// 定义一个枚举
enum RESIZE_STATUS {
  NONE,
  RESIZING,
  RESIZED,
}

// 定义一个借口（自动缩放，设置最大值和最小值）
export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

// 定义一个借口；文本组件state（style）
export interface TextAreaState {
  textareaStyles?: React.CSSProperties;
  /** We need add process style to disable scroll first and then add back to avoid unexpected scrollbar  */
  resizeStatus?: RESIZE_STATUS;
}

class ResizableTextArea extends React.Component<TextAreaProps, TextAreaState> {

  // 类属性
  nextFrameActionId!: number;
  resizeFrameId!: number;
  textArea!: HTMLTextAreaElement;

  constructor(props: TextAreaProps) {
    super(props);
    this.state = {
      textareaStyles: {},
      resizeStatus: RESIZE_STATUS.NONE,
    };
  }
  
  saveTextArea = (textArea: HTMLTextAreaElement) => {
    this.textArea = textArea;
  };

  componentDidMount() {
    this.resizeTextarea();
  }

  componentDidUpdate(prevProps: TextAreaProps) {
    // Re-render with the new content then recalculate the height as required.
    if (prevProps.value !== this.props.value) {
      this.resizeTextarea();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.nextFrameActionId);
    cancelAnimationFrame(this.resizeFrameId);
  }

  handleResize = (size: { width: number; height: number }) => {
    const { resizeStatus } = this.state;
    if (resizeStatus !== RESIZE_STATUS.NONE) {
      return;
    }
    const { autoSize, onResize } = this.props;
    if (typeof onResize === 'function') {
      onResize(size);
    }
    if (autoSize) {
      this.resizeOnNextFrame();
    }
  };

  resizeOnNextFrame = () => {
    cancelAnimationFrame(this.nextFrameActionId);
    this.nextFrameActionId = requestAnimationFrame(this.resizeTextarea);
  };

  resizeTextarea = () => {
    const { autoSize } = this.props;
    if (!autoSize || !this.textArea) {
      return;
    }
    const { minRows, maxRows } = autoSize as AutoSizeType;
    const textareaStyles = calculateNodeHeight(
      this.textArea,
      false,
      minRows,
      maxRows,
    );
    this.setState({
      textareaStyles,
      resizeStatus: RESIZE_STATUS.RESIZING
    }, () => {
      cancelAnimationFrame(this.resizeFrameId);
      this.resizeFrameId = requestAnimationFrame(() => {
        this.setState({ resizeStatus: RESIZE_STATUS.RESIZED }, () => {
          this.resizeFrameId = requestAnimationFrame(() => {
            this.setState({ resizeStatus: RESIZE_STATUS.NONE });
            this.fixFirefoxAutoScroll();
          });
        });
      });
    });
  };

  // https://github.com/ant-design/ant-design/issues/21870
  fixFirefoxAutoScroll() {
    try {
      if (document.activeElement === this.textArea) {
        const currentStart = this.textArea.selectionStart;
        const currentEnd = this.textArea.selectionEnd;
        this.textArea.setSelectionRange(currentStart, currentEnd);
      }
    } catch (e) {
      // Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
    }
  }

  renderTextArea = () => {
    const {
      prefixCls = 'rc-textarea',
      autoSize,
      onResize,
      className,
      disabled,
    } = this.props;
    const { textareaStyles, resizeStatus } = this.state;
    const otherProps: any = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'autoSize',
      'defaultValue',
      'onResize',
    ]);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
    });
    // Fix https://github.com/ant-design/ant-design/issues/6776
    // Make sure it could be reset when using form.getFieldDecorator
    if ('value' in otherProps) {
      otherProps.value = otherProps.value || '';
    }
    const style: React.CSSProperties = {
      ...this.props.style,
      ...textareaStyles,
      ...(resizeStatus === RESIZE_STATUS.RESIZING
        ? // React will warning when mix `overflow` & `overflowY`.
          // We need to define this separately.
          { overflowX: 'hidden', overflowY: 'hidden' }
        : null),
    };
    return (
      <ResizeObserver
        onResize={this.handleResize}
        disabled={!(autoSize || onResize)}
      >
        <textarea
          {...otherProps}
          className={cls}
          style={style}
          ref={this.saveTextArea}
        />
      </ResizeObserver>
    );
  };

  render() {
    return this.renderTextArea();
  }
}

export default ResizableTextArea;
