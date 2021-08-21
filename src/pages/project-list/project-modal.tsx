import React, { useEffect } from 'react'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useProjectModal, useProjectsQueryKey } from './project-utils'
import { UserSelect } from '../../components/user-select'
import { useAddProject, useEditProject } from '../../utils/use-project'
import { ErrorBox } from '../../components/lib'
import styled from '@emotion/styled'

export const ProjectModal = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal()
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
    useProjectsQueryKey(),
  )
  const [ form ] = Form.useForm()
  const onFinish = ( values: any ) => {
    mutateAsync( { ...editingProject, ...values } ).then( () => {
      form.resetFields()
      close()
    } )
  }
  const closeModal = () => {
    form.resetFields()
    close()
  }

  const title = editingProject ? '编辑项目' : '创建项目'

  useEffect( () => {
    form.setFieldsValue( editingProject )
  }, [ editingProject, form ] )

  return (
    <Drawer
      onClose={ closeModal }
      visible={ projectModalOpen }
      width={ '100%' }
      forceRender={ true }
    >
      <Container>
        {
          isLoading ? <Spin size={ 'large' } /> : <>
            <h1>{ title }</h1>
            <ErrorBox error={ error } />
            <Form form={ form } layout={ 'vertical' } style={ { width: '40rem' } }
                  onFinish={ onFinish }>
              <Form.Item name="name" label={ '名称' } rules={ [ { required: true, message: '请输入项目名' } ] }>
                <Input type="text" id="name" placeholder={ '请输入项目名' } />
              </Form.Item>
              <Form.Item name="organization" label={ '名称' } rules={ [ { required: true, message: '请输入部门名' } ] }>
                <Input type="text" id="organization" placeholder={ '请输入部门名' } />
              </Form.Item>
              <Form.Item name="personId" label={ '负责人' } rules={ [ { required: true, message: '请输入负责人名' } ] }>
                <UserSelect defaultOptionName={ '负责人' } />
              </Form.Item>
              <Form.Item>
                <Button type={ 'primary' } htmlType={ 'submit' }>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        }
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`
