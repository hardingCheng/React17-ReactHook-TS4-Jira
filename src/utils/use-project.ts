import { useHttp } from './http'
import { Project } from '../pages/project-list'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-update'

export const useProjects = ( param?: Partial<Project> ) => {
  const http = useHttp()
  // 'projects', param 谁变化 就触发
  return useQuery<Project[], Error>( [ 'projects', param ], () => http( 'projects', { data: param } ) )
}
// React Hook 只能放在最顶层
export const useEditProject = ( queryKey: QueryKey ) => {
  const client = useHttp()
  return useMutation(
    ( params: Partial<Project> ) =>
      client( `projects/${ params.id }`, {
        method: 'PATCH',
        data: params,
      } ),
    useEditConfig( queryKey ),
  )
}
export const useAddProject = ( queryKey: QueryKey ) => {
  const client = useHttp()

  return useMutation(
    ( params: Partial<Project> ) =>
      client( `projects`, {
        data: params,
        method: 'POST',
      } ),
    useAddConfig( queryKey ),
  )
}

export const useDeleteProject = ( queryKey: QueryKey ) => {
  const client = useHttp()

  return useMutation(
    ( { id }: { id: number } ) =>
      client( `projects/${ id }`, {
        method: 'DELETE',
      } ),
    useDeleteConfig( queryKey ),
  )
}

export const useProject = ( id?: number ) => {
  const client = useHttp()
  return useQuery<Project>(
    [ 'project', { id } ],
    () => client( `projects/${ id }` ),
    {
      enabled: Boolean( id ),
    },
  )
}
