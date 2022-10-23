import React from 'react';
import PortalWrapper from '../src/PortalWrapper';

// portal 入口站点
export default () => {
  // React.useRef 是 hook 函数，类似于 React.createRef 函数，可以创建 ref 获取 DOM 节点
  const divRef = React.useRef();
  const outerRef = React.useRef();

  React.useEffect(() => {
    console.log('>>>', divRef.current);
  }, []);

  // 获取外部容器ref，以及获取内部 DIV 的 ref
  return (
    <>
      <PortalWrapper visible getContainer={() => outerRef.current}>
        {() => <div ref={divRef}>2333</div>}
      </PortalWrapper>
      <div style={{ background: 'red', height: 20 }} ref={outerRef} />
    </>
  );
};


// import React from 'react';
// import PortalWrapper from '../src/PprtalWrapper';
// export default () => {
//   const dicRef = React.useRef();
//   const outerRef = React.useRef();
//   React.useEffect(() => {
//     console.log(divRef.current);
//   }, []);
//   return (<>
//     <PortalWrapper visible getContainer={() => outerRef.current}>
//       {() => <div ref={divRef}>2333</div>}
//     </PortalWrapper>
//     <div style={{ background: 'red', height: 20 }} ></div>
//   </>);
// }
