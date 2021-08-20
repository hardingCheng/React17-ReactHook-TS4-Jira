import { useMemo } from 'react'
import { URLSearchParamsInit,useSearchParams } from 'react-router-dom'
import { cleanObject,subset } from 'utils'

/**
 * 返回页面url中，指定键的参数值  获取url中的参数
 */
// K extends string  K 必须是 string
export const useUrlQueryParam = <K extends string>( keys: K[] ) => {
  const [ searchParams,setSearchParam ] = useSearchParams()
  return [
    /*
    把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
    记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。
    如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
     */
    useMemo(
      () =>
        subset( Object.fromEntries( searchParams ),keys ) as {
          [key in K]: string;
        },
      // 只有 searchParams改变的时候才去执行上面的操作
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [ searchParams ],
    ),
    // 传一个对象，对象的值必须限定在 K 中 { [key in K]: unknown }
    ( params: Partial<{ [key in K]: unknown }> ) => {
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      const o = cleanObject( {
        ...Object.fromEntries( searchParams ),
        ...params,
      } ) as URLSearchParamsInit
      return setSearchParam( o )
    },
  ] as const
}
