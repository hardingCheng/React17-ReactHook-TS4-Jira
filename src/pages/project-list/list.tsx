import React from 'react'
import { Project } from './index'
import { User } from './search-panel'
import { Button, Dropdown, Menu, Table } from 'antd'
import dayjs from 'dayjs'

interface ListProps {
  list: Project[];
  users: User[];
}

// interface ListProps extends ColumnsType<Project> {
//   users: User[];
// }

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: '名称',
          // render(value, project) {
          //   const id = project.id.toString()
          //   return <Link to={id}>{project.name}</Link>
          // },
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
          title: '部门 ',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                '未知'}
              </span>
            )
          }
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          }
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={'edit'}>编辑</Menu.Item>
                    <Menu.Item key={'add'}>
                      <Button type={'link'}>删除</Button>
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button type={'link'}>....</Button>
              </Dropdown>
            )
          }
        }
      ]}
    />
  )
}
