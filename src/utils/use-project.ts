import { useHttp } from './http'
import { Project } from '../pages/project-list'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useProjects = ( param?: Partial<Project> ) => {
  const http = useHttp()
  // 'projects', param 谁变化 就触发
  return useQuery<Project[], Error>( [ 'projects', param ], () => http( 'projects', { data: param } ) )
}
// React Hook 只能放在最顶层
export const useEditProject = () => {
  const http = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    ( params: Partial<Project> ) => http( `projects/${ params.id }`, {
      method: 'PATCH',
      data: params,
    } ), {
      onSuccess: () => queryClient.invalidateQueries( 'projects' ),
    },
  )
}
export const useAddProject = () => {
  const http = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    ( params: Partial<Project> ) => http( `projects/${ params.id }`, {
      data: params,
      method: 'POST',
    } ), {
      onSuccess: () => queryClient.invalidateQueries( 'projects' ),
    },
  )
}

export const useProject = ( id?: number ) => {
  const client = useHttp()
  return useQuery<Project>(
    [ 'projects', { id } ],
    () => client( `projects/${ id }` ),
    {
      enabled: Boolean( id ),
    } )
}
