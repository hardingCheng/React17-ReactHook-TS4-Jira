import React from 'react'
import { Button, Drawer } from 'antd'
import { useProjectModalUrl } from './project-utils'

export const ProjectModal = () => {
  const { projectCreate, close } = useProjectModalUrl()
  return (
    <Drawer
      onClose={ close }
      visible={ projectCreate }
      width={ '100%' }
    >
      <h1>ProjectModal</h1>
      <Button onClick={ close }>关闭</Button>
    </Drawer>
  )
}
