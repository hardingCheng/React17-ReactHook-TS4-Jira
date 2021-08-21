import React from 'react'
import { IdSelect } from 'components/id-select'
import { useTaskTypes } from '../utils/use-task-type'

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>,
) => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={ taskTypes || [] } { ...props } />
}
