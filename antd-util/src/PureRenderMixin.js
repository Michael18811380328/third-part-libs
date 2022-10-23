/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentWithPureRenderMixin
 */

const shallowEqual = require('shallowequal');

function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

// // 纯组件渲染混入？
// // react 组件更新时，浅对比对象的实现
// const shallowEqual = require('shallowequal');
// // 浅比较：当前组件的 state props 和下一个状态是否相同
// function shallowCompare(instance, nextProps, nextState) {
//   return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
// }

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this mixin for a
 * considerable performance boost.
 * 如果你的React组件的渲染功能是纯组件，例如它会在相同的 props 和状态下渲染相同的结果，那么提供这个mixin来显著提高性能。
 *
 * Most React components have pure render functions.
 * 大多数React组件都有纯渲染功能。
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin = require('ReactComponentWithPureRenderMixin');
 * 
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 * 
 * 注意：这个函数适合数据简单的情况。如果包含复杂的数据类型，可能是不正确的
 *
 * See https://facebook.github.io/react/docs/pure-render-mixin.html
 */
const ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },
};

// const ReactComponentWithPureRenderMixin = {
//   shouldComponentUpdate(nextProps, nextState) {
//     return shallowCompare(this, nextProps, nextState);
//   }
// };

// 这个组件的功能：封装了纯组件的 shouldComponentUpdate 生命周期函数
// 直接 React.createClass 混入了自定义的生命周期函数，并实现了数据浅对比

module.exports = ReactComponentWithPureRenderMixin;
