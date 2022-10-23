import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

// 辅助函数：获取显示的值及是否可以选择
const formatOption = (option, disabledOptions) => {
  let value = `${option}`;
  if (option < 10) {
    value = `0${option}`;
  }
  // 可以使用 ES7 中的 padStart(2, '0') 代替
  let disbaled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disbaled = true;
  }
  return { value, disbaled };
};

class Combobox extends Component {

  static propTypes = {
    format: PropTypes.string,
    defaultOpenValue: PropTypes.object,
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    onAmPmChange: PropTypes.func,
    showHour: PropTypes.bool,
    showMinute: PropTypes.bool,
    showSecond: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    onCurrentSelectPanelChange: PropTypes.func,
    use12Hours: PropTypes.bool,
    onEsc: PropTypes.func,
    isAM: PropTypes.bool,
  };

  // 选择器变化回调函数（根据不同的选择器type处理不同的值）
  onItemChange = (type, itemValue) => {
    const {
      onChange,
      defaultOpenValue,
      use12Hours,
      value: propValue,
      isAM,
      onAmPmChange,
    } = this.props;
    // 这里的值是 moment，支持复制API，clone()
    const value = (propValue || defaultOpenValue).clone();

    if (type === 'hour') {
      if (use12Hours) {
        if (isAM) {
          value.hour(+itemValue % 12);
        } else {
          value.hour((+itemValue % 12) + 12);
        }
      } else {
        value.hour(+itemValue);
      }
    }
    else if (type === 'minute') {
      value.minute(+itemValue);
    }
    else if (type === 'ampm') {
      const ampm = itemValue.toUpperCase();
      if (use12Hours) {
        if (ampm === 'PM' && value.hour() < 12) {
          value.hour((value.hour() % 12) + 12);
        }
        if (ampm === 'AM') {
          if (value.hour() >= 12) {
            value.hour(value.hour() - 12);
          }
        }
      }
      onAmPmChange(ampm);
    } else {
      value.second(+itemValue);
    }
    onChange(value);
  };

  // 进入选择组件侧栏回调函数
  onEnterSelectPanel = (range) => {
    const { onCurrentSelectPanelChange } = this.props;
    onCurrentSelectPanelChange(range);
  };

  // 下面是不同类型渲染选择器组件
  getHourSelect(hour) {
    const {
      prefixCls,
      hourOptions,
      disabledHours,
      showHour,
      use12Hours,
      onEsc,
    } = this.props;
    if (!showHour) {
      return null;
    }
    const disabledOptions = disabledHours();
    let hourOpitonsAdj;
    let hourAdj;
    if (use12Hours) {
      hourOpitonsAdj = [12].concat(hourOptions.filter(h => h < 12 && h > 0));
      hourAdj = hour % 12 || 12;
    } else {
      hourOpitonsAdj = hourOptions;
      hourAdj = hour;
    }

    return (
      <Select
        prefixCls={prefixCls}
        options={hourOpitonsAdj.map(op => formatOption(op, disabledOptions))}
        selectedIndex={hourOpitonsAdj.indexOf(hourAdj)}
        type="hour"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('hour')}
        onEsc={onEsc}
      />
    );
  }

  getMinuteSelect(minute) {
    const {
      prefixCls,
      minuteOptions,
      disabledMinutes,
      defaultOpenValue,
      showMinute,
      value: propValue,
      onEsc,
    } = this.props;

    if (!showMinute) {
      return null;
    }
    const value = propValue || defaultOpenValue;
    const disabledOptions = disabledMinutes(value.hour());

    return (
      <Select
        prefixCls={prefixCls}
        options={minuteOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('minute')}
        onEsc={onEsc}
      />
    );
  }

  getSecondSelect(second) {
    const {
      prefixCls,
      secondOptions,
      disabledSeconds,
      showSecond,
      defaultOpenValue,
      value: propValue,
      onEsc,
    } = this.props;
    if (!showSecond) {
      return null;
    }
    const value = propValue || defaultOpenValue;
    const disabledOptions = disabledSeconds(value.hour(), value.minute());
    return (
      <Select
        prefixCls={prefixCls}
        options={secondOptions.map(op => formatOption(op, disabledOptions))}
        selectedIndex={secondOptions.indexOf(second)}
        type="second"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('second')}
        onEsc={onEsc}
      />
    );
  }

  getAMPMSelect() {
    const {
      prefixCls,
      use12Hours,
      format,
      isAM,
      onEsc,
    } = this.props;
    if (!use12Hours) {
      return null;
    }
    // If format has A char, then we should uppercase AM/PM
    const AMPMOptions = ['am', 'pm']
      .map(c => (format.match(/\sA/) ? c.toUpperCase() : c))
      .map(c => ({ value: c }));

    const selected = isAM ? 0 : 1;
    return (
      <Select
        prefixCls={prefixCls}
        options={AMPMOptions}
        selectedIndex={selected}
        type="ampm"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('ampm')}
        onEsc={onEsc}
      />
    );
  }

  render() {
    const {
      prefixCls,
      defaultOpenValue,
      value: propValue,
    } = this.props;
    const value = propValue || defaultOpenValue;
    return (
      <div className={`${prefixCls}-combobox`}>
        {this.getHourSelect(value.hour())}
        {this.getMinuteSelect(value.minute())}
        {this.getSecondSelect(value.second())}
        {this.getAMPMSelect(value.hour())}
      </div>
    );
  }
}

export default Combobox;
