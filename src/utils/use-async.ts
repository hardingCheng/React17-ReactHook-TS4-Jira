import { useCallback, useState } from 'react'
import { useMountedRef } from './index'

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

  const mountedRef = useMountedRef()

  // useState保存状态
  // useState直接传入一个函数是 惰性初始化  会立马执行这个初始化函数  用useState保存函数不能直接写入() => {}
  // const [ retry, setRetry ] = useState( () => {
  // })
  const [ retry, setRetry ] = useState(() => () => {
  })
  // useRef 包含一个值或者函数时候  useRef定义的值不是组件状态，就是一个普通的变量，修改的时候不会触发组件重现渲染
  // useRef.current 只会读取一次
  const setData = useCallback((data: D) => {
    setState({
      data,
      status: 'success',
      error: null
    })
  }, [])
  const setError = useCallback((error: Error) => {
    setState({
      data: null,
      status: 'error',
      error
    })
  }, [])
  // run是用来触发异步请求的
  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      // throw newError() 阻断一切进程
      throw new Error('请传入  Promise 类型数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    // 处理依赖setState({ ...state, status: 'loading' })
    setState(prevState => ({ ...prevState, status: 'loading' }))
    return promise.then((data) => {
      // 组件挂载了 但是没卸载才能赋值   阻止给卸载组件赋值
      if (mountedRef.current) {
        setData(data)
        return data
      }
    }).catch((error) => {
      setError(error)
      return error
    })
    // 在useCallback 或者在依赖中用到 依赖的值 setState({ ...state, status: 'loading' })会导致死循环
  }, [ mountedRef, setData, setError ])

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
