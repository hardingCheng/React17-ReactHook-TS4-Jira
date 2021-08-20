import React from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce } from '../../utils'
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib'
import styled from '@emotion/styled'
import { useProjects } from '../../utils/use-project'
import { useUsers } from '../../utils/use-user'
import { useProjectModalUrl, useProjectsSearchParams } from './project-utils'

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
  // const [param,setParam ] = useState({
  //   name: '',
  //   personId: ''
  // })
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里（useState创建的）；非组件状态的   对象（对象，数组，函数等） ，绝不可以放到依赖里，会造成死循环渲染
  // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
  const { open } = useProjectModalUrl()
  const [ param, setParam ] = useProjectsSearchParams()
  const debouncedParam = useDebounce( param, 200 )
  const { isLoading, data: list, error } = useProjects( debouncedParam )
  const { data: users } = useUsers()
  return (
    <Container>
      <Row between={ true }>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={ open }
          type={ 'link' }
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={ param } setParam={ setParam } users={ users || [] } />
      <ErrorBox error={ error } />
      <List dataSource={ list || [] } users={ users || [] } loading={ isLoading } />
    </Container>
  )
}

// 使用 @welldone-software/why-did-you-render 看看谁造成了这个页面渲染 用的时候改为true
ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`

