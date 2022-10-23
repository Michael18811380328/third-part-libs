import ReactDOM from 'react-dom';

function defaultGetContainer() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}

export default function getContainerRenderMixin(config) {
  const {
    autoMount = true,
    autoDestroy = true,
    isVisible,
    isForceRender,
    getComponent,
    getContainer = defaultGetContainer,
  } = config;

  let mixin;

  function renderComponent(instance, componentArg, ready) {
    if (
      !isVisible || instance._component || isVisible(instance) ||
        (isForceRender && isForceRender(instance))
    ) {
      if (!instance._container) {
        instance._container = getContainer(instance);
      }
      let component;
      if (instance.getComponent) {
        component = instance.getComponent(componentArg);
      } else {
        component = getComponent(instance, componentArg);
      }
      ReactDOM.unstable_renderSubtreeIntoContainer(instance,
        component, instance._container,
        function callback() {
          instance._component = this;
          if (ready) {
            ready.call(this);
          }
        });
    }
  }

  if (autoMount) {
    mixin = {
      ...mixin,
      componentDidMount() {
        renderComponent(this);
      },
      componentDidUpdate() {
        renderComponent(this);
      },
    };
  }

  if (!autoMount || !autoDestroy) {
    mixin = {
      ...mixin,
      renderComponent(componentArg, ready) {
        renderComponent(this, componentArg, ready);
      },
    };
  }

  function removeContainer(instance) {
    if (instance._container) {
      const container = instance._container;
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      instance._container = null;
    }
  }

  if (autoDestroy) {
    mixin = {
      ...mixin,
      componentWillUnmount() {
        removeContainer(this);
      },
    };
  } else {
    mixin = {
      ...mixin,
      removeContainer() {
        removeContainer(this);
      },
    };
  }

  return mixin;
}

// 获取容器渲染混入
// import ReactDOM from 'react-dom';

// // 默认获取容器（直接新建一个空DIV并增加到body，然后返回容器）
// function defaultGetContainer() {
//   const container = document.createElement('div');
//   document.body.appendChild(container);
//   return container;
// }

// export default function getContainerRenderMixin(config) {
//   const {
//     autoMount = true,
//     autoDestroy = true,
//     isVisible,
//     isForceRender,
//     getComponent,
//     getContainer = defaultGetContainer,
//   } = config;

//   let minin;

//   function renderComponent(instance, componentArg, ready) {
//     if (!isVisible || instance._component || isVisible(instance) || (isForceRender && isForceRender(instance))) {
//       if (!instance._container) {
//         instance._container = getContainer(instance);
//       }
//       let component;
//       if (instance.getComponent) {
//         component = instance.getComponent(componentArg);
//       } else {
//         component = getComponent(instance, componentArg);
//       }
//       ReactDOM.unstable_renderSubtreeIntoContainer(instance, component, instance._container, function callback() {
//         instance._component = this;
//         if (ready) {
//           ready.call(this);
//         }
//       });
//     }
//   }

//   // 混入函数这样用(如果是自动加载)
//   if (autoMount) {
//     mixin = {
//       ...mixin,
//       componentDidMount() {
//         renderComponent(this);
//       },
//       componentDidUpdate() {
//         renderComponent(this);
//       },
//     };
//   }

//   // 如果不是自动加载自动销毁
//   if (!autoMount || !autoDestroy) {
//     mixin = {
//       ...minin,
//       renderComponent(componentArg, ready) {
//         renderComponent(this, componentArg, ready);
//       },
//     };
//   }

//   // 移除容器
//   function removeContainer(instance) {
//     if (instance._container) {
//       const container = instance._container;
//       ReactDOM.unmountComponentAtNode(container);
//       container.parentNode.removeChild(container);
//       instance._container = null;
//     }
//   }

//   if (autoDestroy) {
//     mixin = {
//       ...mixin,
//       componentWillUnmount() {
//         removeContainer(this);
//       },
//     };
//   } else {
//     mixin = {
//       ...mixin,
//       removeContainer() {
//         removeContainer(this);
//       },
//     };
//   }
//   return mixin;
// }
