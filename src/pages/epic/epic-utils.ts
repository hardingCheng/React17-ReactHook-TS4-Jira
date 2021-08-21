import { useProjectIdInUrl } from '../kanban/kanban-utils'

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useEpicsQueryKey = () => [ 'epics', useEpicSearchParams() ]
