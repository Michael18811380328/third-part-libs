import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '../store'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // React Redux includes a <Provider /> component, which makes the Redux store available to the rest of your app:
    // 顶层组件绑定 Privider 创建 store 
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
