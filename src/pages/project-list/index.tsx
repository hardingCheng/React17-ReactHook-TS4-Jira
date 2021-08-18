import React, { useEffect, useState } from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject, useDebounce } from '../../utils'
import { useHttp } from '../../utils/http'
import { Row } from 'components/lib'
import styled from '@emotion/styled'

// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型   TypeScript

export interface Project {
  id: number;
  name: string;
  personId: number;
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
  const [ list, setList ] = useState([])
  const [ users, setUsers ] = useState([])
  const http = useHttp()
  //行为
  useEffect(() => {
    http('projects', { data: cleanObject(debouncedParam) }).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ debouncedParam ])
  //行为
  useEffect(() => {
    http('users').then(setUsers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`

