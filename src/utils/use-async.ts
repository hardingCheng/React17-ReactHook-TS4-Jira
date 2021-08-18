import { useState } from 'react'

interface State<D> {
  error: Error | null;
  data: D | null;
  status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null
}
// 处理异步请求
export const useAsync = <D>(initialState?: State<D>) => {
  const [ state, setState ] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  const setData = (data: D) => {
    setState({
      data,
      status: 'success',
      error: null
    })
  }
  const setError = (error: Error) => {
    setState({
      data: null,
      status: 'error',
      error
    })
  }
  // run是用来触发异步请求的
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      // throw newError() 阻断一切进程
      throw new Error('请传入  Promise 类型数据')
    }
    setState({ ...state, status: 'loading' })
    return promise.then((data) => {
      setData(data)
      return data
    }).catch((error) => {
      setError(error)
      return error
    })
  }
  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    ...state
  }
}
