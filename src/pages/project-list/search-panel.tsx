import React from 'react'
import { Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'
import { Project } from '../../type/projects'
import { User } from '../../type/users'

//告诉别人我的参数是什么样子的
interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, 'name' | 'personId'>>;
  setParam: ( param: SearchPanelProps['param'] ) => void;
}

export const SearchPanel = ( { param, setParam, users }: SearchPanelProps ) => {
  return (
    <Form style={ { marginBottom: '2rem' } } layout={ 'inline' }>
      <Form.Item>
        <Input
          type="text"
          value={ param.name }
          onChange={ ( event ) =>
            setParam( {
              ...param,
              name: event.target.value,
            } )
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={ '负责人' }
          value={ param.personId }
          onChange={ ( value ) =>
            setParam( {
              ...param,
              personId: value,
            } )
          }
        />
      </Form.Item>
    </Form>
  )
}
