import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 渲染容器：既然我们不需要支持 React15 版本，这个组件将在主要版本中移除
 * @deprecated Since we do not need support React15 any more.
 * Will remove in next major version.
 */
export default class ContainerRender extends React.Component {

  static defaultProps = {
    autoMount: true,
    autoDestroy: true,
    forceRender: false,
  };

  componentDidMount() {
    if (this.props.autoMount) {
      this.renderComponent();
    }
  }

  componentDidUpdate() {
    if (this.props.autoMount) {
      this.renderComponent();
    }
  }

  componentWillUnmount() {
    if (this.props.autoDestroy) {
      this.removeContainer();
    }
  }

  removeContainer = () => {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  };

  renderComponent = (props, ready) => {
    const {
      visible,
      getComponent,
      forceRender,
      getContainer,
      parent,
    } = this.props;
    if (visible || parent._component || forceRender) {
      if (!this.container) {
        this.container = getContainer();
      }
      ReactDOM.unstable_renderSubtreeIntoContainer(
        parent,
        getComponent(props),
        this.container,
        function callback() {
          if (ready) {
            ready.call(this);
          }
        },
      );
    }
  };

  render() {
    return this.props.children({
      renderComponent: this.renderComponent,
      removeContainer: this.removeContainer,
    });
  }
}

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ReadStream } from 'tty';

// export default class ContainerRender extends React.Component {

//   static defaultProps = {
//     // 默认自动加载，自动销毁；不强制渲染
//     autoMount: true,
//     autoDestroy: true,
//     forceRender: false,
//   };

//   // 如果自动加载，渲染组件
//   componentDidMount() {
//     if (this.props.autoMount) {
//       this.renderComponent();
//     }
//   }

//   // 组件重新加载后，渲染组件
//   componentDidUpdate() {
//     if (this.props.autoMount) {
//       this.renderComponent();
//     }
//   }

//   // 如果自动销毁，那么移除容器
//   componentWillUnmount() {
//     if (this.props.autoDestroy) {
//       this.removeContainer();
//     }
//   }

//   removeContainer = () => {
//     if (this.container) {
//       // 清空节点树(卸载当前节点的组件)
//       ReactDOM.unmountComponentAtNode(this.container);
//       // 父节点删除当前的容器节点
//       this.container.parentNode.removeChild(this.container);
//       // 重置类属性
//       this.container = null;
//     }
//   }

//   // 渲染组件
//   renderComponent = (props, ready) => {
//     const {
//       visible,
//       getComponent,
//       forceRender,
//       getContainer,
//       parent,
//     } = this.props;
//     if (visible || parent._component || forceRender) {
//       if (!this.container) {
//         this.container = getContainer();
//       }
//       // 函数需要四个参数
//       // 作用：就是更新组件到传入的 DOM 节点上，完成在组件内实现跨组件的 DOM 操作。
//       ReactDOM.unstable_renderSubtreeIntoContainer(
//         parent,
//         getComponent(props),
//         this.container,
//         function callback() {
//           if (ready) {
//             ready.call(this);
//           }
//         },
//       );
//     }
//   };

//   render() {
//     return this.props.children({
//       renderComponent: this.renderComponent,
//       removeContainer: this.removeContainer,
//     });
//   }
// }
