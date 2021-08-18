import React from 'react'
import { Form, Input, Select } from 'antd'

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

//告诉别人我的参数是什么样子的
interface SearchPanelProps {
  users: User[];
  param: {
    name: string
    personId: string
  };
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          defaultValue="负责人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((item) => (
            <Select.Option key={item.id} value={String(item.id)}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
