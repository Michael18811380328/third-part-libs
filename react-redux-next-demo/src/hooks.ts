import type { ChangeEvent } from 'react'

// 原生 hook
import { useEffect, useRef } from 'react'

// react-redux 提供了一系列自定义 hook，便于 React 组件和 Redux store 交互
// React Redux provides a pair of custom React hooks that allow your React components to interact with the Redux store.
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, AppState } from './store'

// 目前外部未用到这个 HOOK
export const useForm = <TContent>(defaultValues: TContent) => (handler: (content: TContent) => void) =>
  async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.persist()

    const form = event.target as HTMLFormElement
    const elements = Array.from(form.elements) as HTMLInputElement[]
    const data = elements
      .filter((element) => element.hasAttribute('name'))
      .reduce(
        (object, element) => ({
          ...object,
          [`${element.getAttribute('name')}`]: element.value,
        }),
        defaultValues
      )
    await handler(data)
    form.reset()
  }

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>()
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    const handler = (...args: any) => savedCallback.current?.(...args)

    if (delay !== null) {
      const id = setInterval(handler, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// 两个提供的 hook
// useDispatch returns the store's dispatch method to let you dispatch actions.
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()

// useSelector reads a value from the store state and subscribes to updates
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
