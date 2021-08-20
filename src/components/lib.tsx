// css in js 公共样式
import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'
import React from 'react'

// css in js可以当做普通组件传入值使用   具有了变量化
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${ ( props ) => (props.between ? 'space-between' : undefined) };
  margin-bottom: ${ ( props ) => props.marginBottom + 'rem' };

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${ ( props ) =>
            typeof props.gap === 'number'
                    ? props.gap + 'rem'
                    : props.gap
                            ? '2rem'
                            : undefined };
  }
}
`
export const FullPageLoading = () => (
  <FullPage>
    <Spin size={ 'large' } />
  </FullPage>
)

export const FullPageErrorFallback = ( { error }: { error: Error | null } ) => (
  <FullPage>
    <DevTools />
    <ErrorBox error={ error } />
  </FullPage>
)
// 类型守卫
const isError = ( value: any ): value is Error => value?.message
export const ErrorBox = ( { error }: { error: unknown } ) => {
  if ( isError( error ) ) {
    return (<Typography.Text type={ 'danger' }>{ error?.message }</Typography.Text>)
  }
  return null
}

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ButtonNoPadding = styled( Button )`
  padding: 0;
`
