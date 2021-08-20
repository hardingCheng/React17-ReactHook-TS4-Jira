import { useUrlQueryParam } from 'utils/use-url-query-param'
import { useMemo } from 'react'

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [ param, setParam ] = useUrlQueryParam( [ 'name', 'personId' ] )
  return [
    useMemo(
      // 我们依赖了一个 被改造的param 必须用useMemo 否则要是循环渲染的
      () => ({ ...param, personId: Number( param.personId ) || undefined }),
      [ param ],
    ),
    setParam,
  ] as const
}

export const useProjectModalUrl = () => {
  const [ { projectCreate }, setProjectCreate ] = useUrlQueryParam( [ 'projectCreate' ] )
  const open = () => setProjectCreate( { projectCreate: true } )
  const close = () => setProjectCreate( { projectCreate: undefined } )
  return {
    projectCreate: projectCreate === 'true',
    open,
    close,
  } as const
}
