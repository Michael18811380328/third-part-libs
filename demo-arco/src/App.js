import React from 'react';
import { Button } from '@arco-design/web-react';
import Link from './components/link';
import Layout from './components/layout';
import '@arco-design/web-react/dist/css/arco.css';

export default function App() {
  return (
    <>
      <Button type='secondary'>
        Hello World
      </Button>
      <Link/>
      <Layout/>
    </>
  );
}
