import { Link } from '@arco-design/web-react';

const App = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 100px)',
        gridColumnGap: 24,
      }}
    >
      <Link href='#' status='error'>
        Error Link
      </Link>
      <Link href='#' status='error' disabled>
        Error Link
      </Link>
      <Link href='#' status='success'>
        Success Link
      </Link>
      <Link href='#' status='success' disabled>
        Success Link
      </Link>
      <Link href='#' status='warning'>
        Warning Link
      </Link>
      <Link href='#' status='warning' disabled>
        Warning Link
      </Link>
    </div>
  );
};

export default App;