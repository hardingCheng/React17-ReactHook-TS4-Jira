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
export const useAsync = <D>(initialState?: State<D>, runConfig?: { retry: () => Promise<D> }) => {
  const [ state, setState ] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  // useState保存状态
  // useState直接传入一个函数是 惰性初始化  会立马执行这个初始化函数  用useState保存函数不能直接写入() => {}
  // const [ retry, setRetry ] = useState( () => {
  // })
  const [ retry, setRetry ] = useState(() => () => {
  })
  // useRef 包含一个值或者函数时候  useRef定义的值不是组件状态，就是一个普通的变量，修改的时候不会触发组件重现渲染
  // useRef.current 只会读取一次
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
  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      // throw newError() 阻断一切进程
      throw new Error('请传入  Promise 类型数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
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
    retry,
    ...state
  }
}
