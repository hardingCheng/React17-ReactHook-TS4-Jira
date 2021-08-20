import React from 'react'
import { Project } from './index'
import { User } from './search-panel'
import { Button, Dropdown, Menu, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
// react-router React Router 核心
// react-router-dom 用于 DOM 绑定的 React Router
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/use-project'


//  ListProps = TableProps上面的属性 + 自定义的
interface ListProps extends TableProps<Project> {
  users: User[];
}


export const List = ( { users, ...props }: ListProps ) => {
  const { mutate } = useEditProject()
  const pinProject = ( id: number ) => ( pin: boolean ) =>
    mutate( { id, pin } )
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
            const id = project.id.toString()
            // 在一个Route下使用Link  会自动当做当前的子路由  /project   => /projetc/5
            return <Link to={ id }>{ project.name }</Link>
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
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={ 'edit' }>
                      <Button type={ 'link' }>编辑</Button>
                    </Menu.Item>
                    <Menu.Item key={ 'add' }>
                      <Button type={ 'link' }>删除</Button>
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button type={ 'link' }>....</Button>
              </Dropdown>
            )
          },
        },
      ] }
      { ...props }
    />
  )
}
