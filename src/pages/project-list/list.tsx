import React from 'react'
import { Project } from './index'
import { User } from './search-panel'
import { Table } from 'antd'

interface ListProps {
  list: Project[];
  users: User[];
}

// interface ListProps extends ColumnsType<Project> {
//   users: User[];
// }

export const List = ({ list, users }: ListProps) => {
  return <Table pagination={false} columns={[
    {
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
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
    } ]} dataSource={list}>

  </Table>
  return (
    <Table style={{ margin: '0  auto' }}>
      <thead>
      <tr>
        <th>负责人</th>
        <th>名称</th>
      </tr>
      </thead>
      <tbody>
      {list.map(project => {
        return (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find(user => user.id === project.personId)?.name ||
              '未知'}
            </td>
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
}
