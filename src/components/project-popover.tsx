import React from 'react'
import { Divider,List,Popover,Typography } from 'antd'
import { useProjects } from '../utils/use-project'
import styled from '@emotion/styled'
import { ButtonNoPadding } from './lib'
import { useDispatch } from 'react-redux'
import { projectListActions } from '../store/project.slice'


// eslint-disable-next-line no-undef
export const ProjectPopover = () => {
  const dispatch = useDispatch()
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter( ( project ) => project.pin )
  const content = (
    <ContentContainer>
      <Typography.Text type={ 'secondary' }>收藏项目</Typography.Text>
      <List>
        { pinnedProjects?.map( ( project ) => (
          <List.Item key={ project.personId }>
            <List.Item.Meta title={ project.name } />
          </List.Item>
        ) ) }
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={ () => dispatch( projectListActions.openProjectModal() ) }
        type={ 'link' }
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover placement={ 'bottom' } content={ content }>
      <h2 style={ { cursor: 'pointer' } }>项目</h2>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
