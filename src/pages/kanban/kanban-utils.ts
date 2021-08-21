import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useProject } from 'utils/use-project'
import { useUrlQueryParam } from 'utils/use-url-query-param'

// 获取到当前的url中的project的id
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match( /projects\/(\d+)/ )?.[1]
  return Number( id )
}

// id为？的project
export const useProjectInUrl = () => useProject( useProjectIdInUrl() )

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbansQueryKey = () => [ 'kanbans', useKanbanSearchParams() ]

export const useTasksSearchParams = () => {
  const [ param, setParam ] = useUrlQueryParam( [
    'name',
    'typeId',
    'processorId',
    'tagId',
  ] )
  const projectId = useProjectIdInUrl()
  return useMemo(
    () => ({
      projectId,
      typeId: Number( param.typeId ) || undefined,
      processorId: Number( param.processorId ) || undefined,
      tagId: Number( param.tagId ) || undefined,
      name: param.name,
    }),
    [ projectId, param ],
  )
}


export const useTasksQueryKey = () => [ 'tasks', useTasksSearchParams() ]
