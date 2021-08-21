import { useHttp } from 'utils/http'
import { useQuery } from 'react-query'
import { TaskType } from '../type/task-type'


export const useTaskTypes = () => {
  const client = useHttp()

  return useQuery<TaskType[]>( [ 'taskTypes' ], () => client( 'taskTypes' ) )
}
