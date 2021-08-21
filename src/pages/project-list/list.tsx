import React from 'react'
import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
// react-router React Router 核心
// react-router-dom 用于 DOM 绑定的 React Router
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from 'utils/use-project'
import { useProjectModal, useProjectsQueryKey } from './project-utils'
import { ButtonNoPadding } from 'components/lib'
import { Project } from '../../type/projects'
import { User } from '../../type/users'


//  ListProps = TableProps上面的属性 + 自定义的
interface ListProps extends TableProps<Project> {
  users: User[];
}

// React.memo 为高阶组件。默认情况下其只会对复杂对象做浅层对比.
/*
如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。
 */
export const List = React.memo( ( { users, ...props }: ListProps ) => {
  const { mutate } = useEditProject( useProjectsQueryKey() )
  const pinProject = ( id: number ) => ( pin: boolean ) => mutate( { id, pin } )
  return (
    <Table
      rowKey={ 'id' }
      pagination={ false }
      columns={ [
        {
          title: <Pin checked={ true } disabled={ true } />,
          render( value, project ) {
            return (
              <Pin
                checked={ project.pin }
                // pin => mutate({id:xxx,pin})
                onCheckedChange={ pinProject( project.id ) }
              />
            )
          },
        },
        {
          title: '名称',
          render( value, project ) {
            // 在一个Route下使用Link  会自动当做当前的子路由  /project   => /projetc/5
            return <Link to={ String( project.id ) }>{ project.name }</Link>
          },
          sorter: ( a, b ) => a.name.localeCompare( b.name ),
        },
        {
          title: '部门 ',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render( value, project ) {
            return (
              <span>
                { users.find( ( user ) => user.id === project.personId )?.name ||
                '未知' }
              </span>
            )
          },
        },
        {
          title: '创建时间',
          render( value, project ) {
            return (
              <span>
                { project.created
                  ? dayjs( project.created ).format( 'YYYY-MM-DD' )
                  : '无' }
              </span>
            )
          },
        },
        {
          render( value, project ) {
            return <More project={ project } />
          },
        },
      ] }
      { ...props }
    />
  )
} )

const More = ( { project }: { project: Project } ) => {
  const { startEditId } = useProjectModal()
  const editProject = ( id: number ) => () => startEditId( id )
  const { mutate: deleteProject } = useDeleteProject( useProjectsQueryKey() )
  const confirmDeleteProject = ( id: number ) => {
    Modal.confirm( {
      title: '确定删除这个项目吗?',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteProject( { id } )
      },
    } )
  }
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={ editProject( project.id ) } key={ 'edit' }>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={ () => confirmDeleteProject( project.id ) }
            key={ 'delete' }
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={ 'link' }>...</ButtonNoPadding>
    </Dropdown>
  )
}
