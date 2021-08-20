import React from 'react'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useProjectModalUrl } from './project-utils'
import { UserSelect } from '../../components/user-select'
import { useAddProject, useEditProject } from '../../utils/use-project'
import { useForm } from 'antd/lib/form/Form'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProjectId, isLoading, editingProject } = useProjectModalUrl()
  const title = editingProject ? '编辑项目' : '创建项目'
  const useMutationProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: mutatingLoading } = useMutationProject()
  const [ form ] = useForm()
  const onFinish = ( values: any ) => {
    mutateAsync( { ...editingProject, ...values } ).then( () => {
      form.resetFields()
      close()
    } )
  }
  return (
    <Drawer
      onClose={ close }
      visible={ projectModalOpen }
      width={ '100%' }
    >
      {
        isLoading ? <Spin size={ 'large' } /> : <>
          <h1>{ title }</h1>
          <Form form={ form } layout={ 'vertical' } style={ { width: '40rem' } } onFinish={ onFinish }>
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
              <Button loading={ } type={ 'primary' } htmlType={ 'submit' }>
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      }
      <Button onClick={ close }>关闭</Button>
    </Drawer>
  )
}
