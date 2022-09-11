import { useLocation } from "react-router-dom";
import { Gitee } from '@/common/constants';

// 点击跳转到源代码的链接（原始仓库链接）
export default Source = () => {
  const { pathname } = useLocation();
  const url = `${Gitee}/blob/master/src/pages${pathname}/index.tsx`;
  return (
    <div className="app-source">
      <a
        href={url}
        target="_blank"
        rel="noopener norefrence"
      >&lt; code /&gt;</a>
    </div>
  );
}
