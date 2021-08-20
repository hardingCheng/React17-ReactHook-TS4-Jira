import { useUrlQueryParam } from 'utils/use-url-query-param'
import { useMemo } from 'react'
import { useProject } from '../../utils/use-project'

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
  const [ { projectModalOpen }, setProjectModalOpen ] = useUrlQueryParam( [ 'projectModalOpen' ] )
  const [ { editingProjectId }, setEditingProjectId ] = useUrlQueryParam( [ 'editingProjectId' ] )
  const { data: editingProject, isLoading } = useProject( Number( editingProjectId ) )
  const open = () => setProjectModalOpen( { projectModalOpen: true } )
  const close = () => {
    setProjectModalOpen( { projectModalOpen: undefined } )
    setEditingProjectId( { editingProjectId: undefined } )
  }
  const startEditId = ( id: number ) => setEditingProjectId( { editingProjectId: id } )
  return {
    projectModalOpen: projectModalOpen === 'true' || Boolean( editingProjectId ),
    open,
    close,
    startEditId,
    editingProject,
    editingProjectId,
    isLoading,
  } as const
}
