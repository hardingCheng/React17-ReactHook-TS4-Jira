import { useHttp } from './http'
import { useAsync } from './use-async'
import { useCallback,useEffect } from 'react'
import { cleanObject } from './index'
import { Project } from '../pages/project-list'

export const useProjects = ( param?: Partial<Project> ) => {
  const http = useHttp()
  const { run,...result } = useAsync<Project[]>()
  const fetchProjectUrl = useCallback( () => http( 'projects',{ data: cleanObject( param || {} ) } ),[ http,param ] )
  //行为
  useEffect( () => {
    run( fetchProjectUrl(),{ retry: fetchProjectUrl } )
  },[ fetchProjectUrl,run ] )
  return result
}

// React Hook 只能放在最顶层
export const useEditProject = () => {
  const http = useHttp(),
    { run,...result } = useAsync<Project[]>(),
    mutate = ( params: Partial<Project> ) => {
      return run(
        http( `projects/${ params.id }`,{
          data: params,
          method: 'PATCH',
        } ),
      )
    }
  return {
    mutate,
    ...result,
  }
}
export const useAddProject = () => {
  const http = useHttp()
  const { run,...result } = useAsync<Project[]>()
  const mutate = ( params: Partial<Project> ) => {
    return run(
      http( `projects/${ params.id }`,{
        data: params,
        method: 'POST',
      } ),
    )
  }
  return {
    mutate,
    ...result,
  }
}
