import styled from '@emotion/styled'
import { Menu } from 'antd'
import { Kanban } from 'pages/kanban'
import React from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { EpicScreen } from '../epic'

//根据路由来看 选择哪个菜单
const useRouteType = () => {
  // http://localhost:3000/projects/1/kanban?processorId=1
  // 只获取路由 不获取参数 useLocation().pathname  http://localhost:3000/projects/1/kanban
  const units = useLocation().pathname.split( '/' )
  return units[units.length - 1]
}
export const ProjectDetail = () => {
  console.log( useLocation().pathname )
  const routeType = useRouteType()
  return (
    <Container>
      <Aside>
        <Menu mode={ 'inline' } selectedKeys={ [ routeType ] }>
          <Menu.Item key={ 'kanban' }>
            <Link to={ 'kanban' }>看板</Link>
          </Menu.Item>
          <Menu.Item key={ 'epic' }>
            <Link to={ 'epic' }>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          {/*projects/:projectId/kanban*/ }
          <Route path={ '/kanban' } element={ <Kanban /> } />
          {/*projects/:projectId/epic*/ }
          <Route path={ '/epic' } element={ <EpicScreen /> } />
          <Navigate to={ '/kanban' } replace={ true } />
        </Routes>
      </Main>
    </Container>
  )
}


const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`
