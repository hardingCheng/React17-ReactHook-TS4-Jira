import React from 'react'
import { Project } from './index'
import { User } from './search-panel'

interface ListProps {
  list: Project[]
  users: User[]
}

export const List = ({ list, users }: ListProps) => {
  return (
    <table style={{ margin: '0  auto' }}>
      <thead>
        <tr>
          <th>负责人</th>
          <th>名称</th>
        </tr>
      </thead>
      <tbody>
        s
        {list.map((project) => {
          return (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
