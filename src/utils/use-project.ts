import { useHttp } from './http'
import { useAsync } from './use-async'
import { useEffect } from 'react'
import { cleanObject } from './index'
import { Project } from '../pages/project-list'

export const useProjects = (param?: Partial<Project>) => {
  const http = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  //行为
  useEffect(() => {
    run(http('projects', { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ param ])
  return result
}
