import React, { useCallback } from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans, useReorderKanban } from 'utils/use-kanban'
import { KanbanColumn } from './kanban-column'
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from './kanban-utils'
import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { ScreenContainer } from '../../components/lib'
import { useReorderTask, useTasks } from 'utils/use-task'
import { Spin } from 'antd'
import { CreateKanban } from './create-kanban'
import { TaskModal } from './task-modal'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop'
import { Profiler } from 'components/profiler'

export const Kanban = () => {
  useDocumentTitle( '看板列表' )
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams(),
  )
  const { isLoading: taskIsLoading } = useTasks( useTasksSearchParams() )
  const isLoading = taskIsLoading || kanbanIsLoading
  const onDragEnd = useDragEnd()
  return (
    <Profiler id={ '看板页面' }>
      <DragDropContext onDragEnd={ onDragEnd }>
        <ScreenContainer>
          <h1>{ currentProject?.name }看板</h1>
          <SearchPanel />
          { isLoading ? (
              <Spin size={ 'large' } />
            )
            : (
              <ColumnsContainer>
                <Drop
                  type={ 'COLUMN' }
                  direction={ 'horizontal' }
                  droppableId={ 'kanban' }
                >
                  <DropChild style={ { display: 'flex' } }>
                    { kanbans?.map( ( kanban, index ) => (
                      <Drag
                        key={ kanban.id }
                        draggableId={ 'kanban' + kanban.id }
                        index={ index }
                      >
                        <KanbanColumn kanban={ kanban } key={ kanban.id } />
                      </Drag>
                    ) ) }
                  </DropChild>
                </Drop>
                <CreateKanban />
              </ColumnsContainer>
            ) }
          <TaskModal />
        </ScreenContainer>
      </DragDropContext>
    </Profiler>
  )
}


export const useDragEnd = () => {
  const { data: kanbans } = useKanbans( useKanbanSearchParams() )
  const { mutate: reorderKanban } = useReorderKanban( useKanbansQueryKey() )
  const { mutate: reorderTask } = useReorderTask( useTasksQueryKey() )
  const { data: allTasks = [] } = useTasks( useTasksSearchParams() )
  return useCallback(
    ( { source, destination, type }: DropResult ) => {
      if ( !destination ) {
        return
      }
      // 看板排序
      if ( type === 'COLUMN' ) {
        const fromId = kanbans?.[source.index].id
        const toId = kanbans?.[destination.index].id
        if ( !fromId || !toId || fromId === toId ) {
          return
        }
        const type = destination.index > source.index ? 'after' : 'before'
        reorderKanban( { fromId, referenceId: toId, type } )
      }
      // 任务排序
      if ( type === 'ROW' ) {
        const fromKanbanId = +source.droppableId
        const toKanbanId = +destination.droppableId
        const fromTask = allTasks.filter(
          ( task ) => task.kanbanId === fromKanbanId,
        )[source.index]
        const toTask = allTasks.filter( ( task ) => task.kanbanId === toKanbanId )[destination.index]
        if ( fromTask?.id === toTask?.id ) {
          return
        }
        reorderTask( {
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? 'after'
              : 'before',
        } )
      }
    },
    [ kanbans, reorderKanban, allTasks, reorderTask ],
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1;
`
