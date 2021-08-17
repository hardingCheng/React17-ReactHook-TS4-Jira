import React from 'react'
import { useAuth } from '../context/auth-context'
import { Button, Form, Input } from 'antd'

export const Login = () => {
  const { login, user } = useAuth()
  const handleSubmit = (values: { username: string, password: string }) => {
    login(values)
  }
  return (
    <Form onFinish={handleSubmit}>
      登录界面
      <Form.Item name="username" rules={[ { required: true, message: '请输入用户名' } ]}>
        <Input type="text" id="username" placeholder={'用户名'} />
      </Form.Item>
      <Form.Item name="password" rules={[ { required: true, message: '请输入密码' } ]}>
        < Input type="password" id="password" placeholder={'密码'} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={'submit'} type={'primary'}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
