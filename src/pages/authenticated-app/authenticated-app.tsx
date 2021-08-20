import React,{ useState } from 'react'
import styled from '@emotion/styled'
import { Button,Dropdown,Menu } from 'antd'
import { ButtonNoPadding,Row } from 'components/lib'
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
  const [ projectModalOpen,setProjectModalOpen ] = useState( false )
  return (
    <Container>
      <PageHeader projectButton={
        <ButtonNoPadding
          onClick={ () => setProjectModalOpen( true ) }
          type={ 'link' }
        >
          创建项目
        </ButtonNoPadding>
      } />
      <Main>
        <Router>
          <Routes>
            <Route path={ '/projects' } element={
              <ProjectListScreen
                // 组合组件  来实现状态共享  就不会产生props一级一级往下传
                projectButton={
                  <ButtonNoPadding
                    onClick={ () => setProjectModalOpen( true ) }
                    type={ 'link' }
                  >
                    创建项目
                  </ButtonNoPadding>
                } /> }
            />
            <Route
              path={ '/projects/:projectId/*' } element={ <ProjectDetail /> }
            />
            <Navigate to={ '/projects' } />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={ projectModalOpen }
        onClose={ () => setProjectModalOpen( false ) }
      />
    </Container>
  )
}

// eslint-disable-next-line no-undef
const PageHeader = ( props: { projectButton: JSX.Element } ) => {
  return (
    <Header between={ true }>
      <HeaderLeft gap={ true }>
        <Button type={ 'link' } onClick={ resetRoute }>
          <SoftwareLogo width={ '18rem' } color={ 'rgb(38, 132, 255)' } />
        </Button>
        <ProjectPopover { ...props } />
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
