// useEffect依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
// 出入的参数都要进行类型定义
import { useEffect, useRef, useState } from 'react'

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''

// 在一个函数里，改变传入的对象本身是不好的
// object就要这种键值对的形式{ [key: string]: unknown }
export const cleanObject = (object: { [key: string]: unknown }) => {
  // 不操作原来的对象，自己的生成一个对象
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
  }, [])
}

// 后面用泛型来规范类型
// 防抖
export const useDebounce = <V>(value: V, delay?: number) => {
  const [ debouncedValue, setDebouncedValue ] = useState<V>(value)

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行s
    return () => clearTimeout(timeout)
  }, [ value, delay ])

  return debouncedValue
}

export const useArray = <T>(initialArray: T[]) => {
  // 不修改原来的值
  const [ value, setValue ] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([ ...value, item ]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [ ...value ]
      copy.splice(index, 1)
      setValue(copy)
    }
  }
}


export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
  // useRef 会在每次渲染时返回同一个 ref 对象。
  const oldTitle = useRef(document.title).current
  // 页面第一次加载的时候 oldTitle === 旧的Title 'Jira 任务管理系统'
  // 加载之后 oldTitle === 新的Title （只要一加载 oldTitle就是最新的值）  const oldTitle = document.title
  useEffect(() => {
    // 修改之后会导致页面重新渲染
    document.title = title
  }, [ title ])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖就会 读取到旧的Title
        document.title = oldTitle
      }
    }
  }, [ keepOnUnmount, oldTitle ])
}

// 重置路由的方法
export const resetRoute = () => (window.location.href = window.location.origin)


/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <O extends { [key in string]: unknown },
  K extends keyof O>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([ key ]) =>
    keys.includes(key as K)
  )
  return Object.fromEntries(filteredEntries) as Pick<O, K>
}

// 返回组件挂载状态
export const useMountedRef = () => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })
  return mountedRef
}
