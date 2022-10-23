import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

// 选择器表头类
class Header extends Component {
  static propTypes = {
    format: PropTypes.string,
    prefixCls: PropTypes.string,
    disabledDate: PropTypes.func,
    placeholder: PropTypes.string,
    clearText: PropTypes.string,
    value: PropTypes.object,
    inputReadOnly: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    onChange: PropTypes.func,
    onEsc: PropTypes.func,
    defaultOpenValue: PropTypes.object,
    currentSelectPanel: PropTypes.string,
    focusOnOpen: PropTypes.bool,
    onKeyDown: PropTypes.func,
    clearIcon: PropTypes.node,
  };

  static defaultProps = {
    inputReadOnly: false,
  };

  // 构造器初始化
  constructor(props) {
    super(props);
    const { value, format } = props;
    this.state = {
      str: (value && value.format(format)) || '',
      invalid: false,
    };
  }

  componentDidMount() {
    const { focusOnOpen } = this.props;
    // wait one frame for the panel to be positioned
    // before focusing
    if (focusOnOpen) {
      // 浏览器兼容-requestAnimationFrame
      const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
      requestAnimationFrame(() => {
        // 一帧后，输入框获取焦点并选中
        this.refInput.focus();
        this.refInput.select();
      });
    }
  }

  // 当父组件 value 更新后，直接更新 str 值
  componentWillReceiveProps(nextProps) {
    const { value, format } = nextProps;
    this.setState({
      str: (value && value.format(format)) || '',
      invalid: false,
    });
  }

  // 输入框回调函数
  onInputChange = (event) => {
    const str = event.target.value;
    this.setState({ str });
    const {
      format,
      hourOptions,
      minuteOptions,
      secondOptions,
      disabledHours,
      disabledMinutes
      disabledSeconds,
      onChange
    } = this.props;

    if (str) {
      const { value: originalValue } = this.props;
      const value = this.getProtoValue().clone();
      const parsed = moment(str, format, true);
      if (!parsed.isValid()) {
        this.setState({ invalid: true });
        return;
      }
      value
        .hour(parsed.hour())
        .minute(parsed.minute())
        .second(parsed.second());

      // if time value not allowed, response warning.
      if (
        hourOptions.indexOf(value.hour()) < 0 ||
        minuteOptions.indexOf(value.minute()) < 0 ||
        secondOptions.indexOf(value.second()) < 0
      ) {
        this.setState({ invalid: true });
        return;
      }

      // if time is disabled, response warning.
      const disabledHourOptions = disabledHours();
      const disabledMinuteOptions = disabledMinutes(value.hour());
      const disabledSecondOptions = disabledSeconds(value.hour(), value.minute());
      if (
        (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0) ||
        (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0) ||
        (disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0)
      ) {
        this.setState({ invalid: true });
        return;
      }

      if (originalValue) {
        if (originalValue.hour() !== value.hour() || originalValue.minute() !== value.minute() || originalValue.secoond() !== value.second()) {
          // keep other fields for ec-calendar
          const changedValue = originalValue.clone();
          changedValue.hour(value.hour());
          changedValue.minute(value.minute());
          changedValue.second(value.second());
          onChange(changedValue);
        }
      } else if (originalValue !== value) {
        onChange(null);
      }
    } else {
      onChange(null);
    }
    this.setState({ invalid: false });
  };

  // 事件处理函数
  onKeyDown = e => {
    const { onEsc, onKeyDown } = this.props;
    if (e.keyCode === 27) {
      onEsc();
    }
    onKeyDown(e);
  };

  getProtoValue() {
    const { value, defaultOpenValue } = this.props;
    return value || defaultOpenValue;
  }

  // 设置INPUT
  getInput() {
    const { prefixCls, placeholder, inputReadOnly } = this.props;
    const { invalid, str } = this.state;
    const invalidClass = invalid ? `${prefoxCls}-input-invalid` : '';
    return (
      <input
        className={classNames(`${prefixCls}-input`, invalidClass)}
        ref={ref => this.refInput = ref}
        onKeyDown={this.onKeyDown}
        value={str}
        placeholder={placeholder}
        onChange={this.onInputChange}
        readOnly={!!inputReadOnly}
      />
    );
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-input-wrap`}>
        {this.getInput()}
      </div>
    );
  }
}

export default Header;
