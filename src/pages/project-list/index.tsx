import React, { useState } from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce } from '../../utils'
import { Row } from 'components/lib'
import styled from '@emotion/styled'
import { useProjects } from '../../utils/use-project'
import { useUsers } from '../../utils/use-user'

// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型   TypeScript

export interface Project {
  id: number;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

export const ProjectListScreen = () => {
  //状态 其实就是Vue里的data
  const [ param, setParam ] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 200)
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUsers()
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`

