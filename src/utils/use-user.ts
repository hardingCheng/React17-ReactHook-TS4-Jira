import { User } from 'pages/project-list/search-panel'
import { useEffect } from 'react'
import { useHttp } from './http'
import { useAsync } from './use-async'
import { cleanObject } from './index'

export const useUsers = (param?: Partial<User>) => {
  const http = useHttp()
  const { run, ...result } = useAsync<User[]>()
  //行为
  useEffect(() => {
    run(http('users', { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ param ])
  return result
}
