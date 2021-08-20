// 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等

import { useCallback,useReducer,useState } from 'react'
import { useMountedRef } from './index'

interface State<D> {
  error: Error | null;
  data: D | null;
  status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false,
}

const useSafeDispatch = <T>( dispatch: ( ...args: T[] ) => void ) => {
  const mountedRef = useMountedRef()
  return useCallback(
    ( ...args: T[] ) => (mountedRef.current ? dispatch( ...args ) : void 0),
    [ dispatch,mountedRef ],
  )
}

// 处理异步请求
export const useAsync = <D>( initialState?: State<D>,initialConfig?: typeof defaultConfig ) => {
  const config = { ...defaultConfig,...initialConfig }
  const [ state,dispatch ] = useReducer(
    ( state: State<D>,action: Partial<State<D>> ) => ({ ...state,...action }),
    {
      ...defaultInitialState,
      ...initialState,
    },
  )
  const safeDispatch = useSafeDispatch( dispatch )
  // useState保存状态
  // useState直接传入一个函数是 惰性初始化  会立马执行这个初始化函数  用useState保存函数不能直接写入() => {}
  // const [ retry, setRetry ] = useState( () => {
  // })
  const [ retry,setRetry ] = useState( () => () => {
  } )
  // useRef 包含一个值或者函数时候  useRef定义的值不是组件状态，就是一个普通的变量，修改的时候不会触发组件重现渲染
  // useRef.current 只会读取一次
  const setData = useCallback(
    ( data: D ) =>
      safeDispatch( {
        data,
        status: 'success',
        error: null,
      } ),
    [ safeDispatch ],
  )

  const setError = useCallback(
    ( error: Error ) =>
      safeDispatch( {
        error,
        status: 'error',
        data: null,
      } ),
    [ safeDispatch ],
  )
  // run是用来触发异步请求的
  const run = useCallback( ( promise: Promise<D>,runConfig?: { retry: () => Promise<D> } ) => {
    if ( !promise || !promise.then ) {
      // throw newError() 阻断一切进程
      throw new Error( '请传入  Promise 类型数据' )
    }
    setRetry( () => () => {
      if ( runConfig?.retry ) {
        run( runConfig?.retry(),runConfig )
      }
    } )
    // 处理依赖setState({ ...state, status: 'loading' })
    safeDispatch( { status: 'loading' } )
    return promise
      .then( ( data ) => {
        setData( data )
        return data
      } )
      .catch( ( error ) => {
        //catch会消化异常，如果不主动抛出，外面是接收不到异常的
        setError( error )
        if ( config.throwOnError ) return Promise.reject( error )
        else return error
      } )
    // 在useCallback 或者在依赖中用到 依赖的值 setState({ ...state, status: 'loading' })会导致死循环
  },[ setData,setError,config.throwOnError,safeDispatch ] )

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    //重新跑一遍run，让state刷新
    retry,
    ...state,
  }
}
