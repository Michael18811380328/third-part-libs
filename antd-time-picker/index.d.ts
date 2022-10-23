// declare module，声明文件以 .d.ts 为后缀
// https://www.runoob.com/typescript/ts-ambient.html
// TypeScript 作为 JavaScript 的超集，在开发过程中不可避免要引用其他第三方的 JavaScript 的库。
// 虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript 诸如类型检查等特性功能。
// 为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，
// 而产生了一个描述 JavaScript 库和模块信息的声明文件。通过引用这个声明文件，
// 就可以借用 TypeScript 的各种特性来使用库文件了。

declare module "rc-time-picker" {

  import { Moment } from 'moment';
  import * as React from "react";

  type TimePickerProps = {
    prefixCls?: string;
    clearText?: string;
    disabled?: boolean;
    allowEmpty?: boolean;
    open?: boolean;
    defaultValue?: Moment;
    defaultOpenValue?: Moment;
    value?: Moment;
    paleholder?: string;
    className?: string;
    id?: string;
    popupClassName?: string;
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    format?: string;
    disabledHours?: () => number[];
    disabledMinutes?: (hour: number) => number[];
    disabledSeconds?: (hour: number, minute: number) => number[];
    use12Hours?: boolean;
    hideDisabledOptions?: boolean;
    onChange?: (newValue: Moment) => void;
    addon?: (instance: typeof Panel) => React.ReactNode;
    placement?: string;
    transitionName?: string;
    name?: string;
    opOpen?: (newState: {open: true}) => void;
    onClose?: (newState: {open: false}) => void;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    focusOpOpen?: boolean;
    inputReadOnly?: boolean;
    inputIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
  };

  export class TimePicker extends React.Component<TimePickerProps> {
    focus(): void;
    blur(): void;
  }

  class Panel extends React.Component<unknown> {
    close(): void;
  }
}
