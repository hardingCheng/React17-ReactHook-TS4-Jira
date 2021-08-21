import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/use-kanban'
import { KanbanColumn } from './kanban-column'
import { useKanbanSearchParams, useProjectInUrl } from './kanban-utils'
import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { ScreenContainer } from '../../components/lib'

export const Kanban = () => {
  useDocumentTitle( '看板列表' )
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams(),
  )
  return <ScreenContainer>
    <h1>{ currentProject?.name }看板</h1>
    <SearchPanel />
    <ColumnsContainer>
      {
        kanbans?.map( ( kanban ) => <KanbanColumn kanban={ kanban } key={ kanban.id } /> )
      }
    </ColumnsContainer>
  </ScreenContainer>
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1;
`
