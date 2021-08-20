import React from 'react'
import { Divider,List,Popover,Typography } from 'antd'
import { useProjects } from '../utils/use-project'
import styled from '@emotion/styled'


// eslint-disable-next-line no-undef
export const ProjectPopover = ( props: { projectButton: JSX.Element } ) => {
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter( ( project ) => project.pin )
  const content = (
    <ContentContainer>
      <Typography.Text type={ 'secondary' }>收藏项目</Typography.Text>
      <List>
        { pinnedProjects?.map( ( project ) => (
          <List.Item>
            <List.Item.Meta title={ project.name } />
          </List.Item>
        ) ) }
      </List>
      <Divider />
      { props.projectButton }
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
