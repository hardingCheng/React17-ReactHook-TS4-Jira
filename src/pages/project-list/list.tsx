import React from 'react'
import { Project } from './index'
import { User } from './search-panel'
import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
// react-router React Router 核心
// react-router-dom 用于 DOM 绑定的 React Router
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from 'utils/use-project'
import { useProjectModal, useProjectsQueryKey } from './project-utils'
import { ButtonNoPadding } from 'components/lib'


//  ListProps = TableProps上面的属性 + 自定义的
interface ListProps extends TableProps<Project> {
  users: User[];
}


export const List = ( { users, ...props }: ListProps ) => {
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
}

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
