import React from 'react'
import styled from '@emotion/styled'
import { Button,Dropdown,Menu } from 'antd'
import { Row } from 'components/lib'
import { ProjectListScreen } from 'pages/project-list'
import { useAuth } from '../context/auth-context'
// 可以把svg当做组件使用
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { BrowserRouter as Router,Navigate,Route,Routes } from 'react-router-dom'
import { ProjectDetail } from '../project'
import { resetRoute } from '../../utils'
import { ProjectModal } from 'pages/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={ '/projects' } element={ <ProjectListScreen /> }
            />
            <Route
              path={ '/projects/:projectId/*' } element={ <ProjectDetail /> }
            />
            <Navigate to={ '/projects' } />
          </Routes>
        </Router>
      </Main>
      <ProjectModal />
    </Container>
  )
}

// eslint-disable-next-line no-undef
const PageHeader = () => {
  return (
    <Header between={ true }>
      <HeaderLeft gap={ true }>
        <Button type={ 'link' } onClick={ resetRoute }>
          <SoftwareLogo width={ '18rem' } color={ 'rgb(38, 132, 255)' } />
        </Button>
        <ProjectPopover />
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout,user } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={ 'layout' }>
            <Button type={ 'link' } onClick={ logout }>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={ 'link' } onClick={ ( e ) => e.preventDefault() }>
        Hi,{ user?.name }
      </Button>
    </Dropdown>
  )
}

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

// grid-area 用来给grid子元素起名字
const Header = styled( Row )`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled( Row )``
const HeaderRight = styled.div`
`
const Main = styled.main``
