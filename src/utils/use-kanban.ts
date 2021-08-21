import { useHttp } from 'utils/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Kanban } from '../type/kanban'
import { useAddConfig, useDeleteConfig } from './use-optimistic-update'

export const useKanbans = ( param?: Partial<Kanban> ) => {
  const client = useHttp()

  return useQuery<Kanban[]>( [ 'kanbans', param ], () =>
    client( 'kanbans', { data: param } ),
  )
}

export const useAddKanban = ( queryKey: QueryKey ) => {
  const client = useHttp()

  return useMutation(
    ( params: Partial<Kanban> ) =>
      client( `kanbans`, {
        data: params,
        method: 'POST',
      } ),
    useAddConfig( queryKey ),
  )
}

export const useDeleteKanban = ( queryKey: QueryKey ) => {
  const client = useHttp()

  return useMutation(
    ( { id }: { id: number } ) =>
      client( `kanbans/${ id }`, {
        method: 'DELETE',
      } ),
    useDeleteConfig( queryKey ),
  )
}
