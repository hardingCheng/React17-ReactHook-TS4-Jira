import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/use-kanban'
import { KanbanColumn } from './kanban-column'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './kanban-utils'
import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { ScreenContainer } from '../../components/lib'
import { useTasks } from 'utils/use-task'
import { Spin } from 'antd'
import { CreateKanban } from './create-kanban'
import { TaskModal } from './task-modal'

export const Kanban = () => {
  useDocumentTitle( '看板列表' )
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams(),
  )
  const { isLoading: taskIsLoading } = useTasks( useTasksSearchParams() )
  const isLoading = taskIsLoading || kanbanIsLoading

  return <ScreenContainer>
    <h1>{ currentProject?.name }看板</h1>
    <SearchPanel />
    { isLoading ? (
        <Spin size={ 'large' } />
      )
      : (
        <ColumnsContainer>
          {
            kanbans?.map( ( kanban ) => <KanbanColumn kanban={ kanban } key={ kanban.id } /> )
          }
          <CreateKanban />
        </ColumnsContainer>
      ) }
    <TaskModal />
  </ScreenContainer>
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1;
`
