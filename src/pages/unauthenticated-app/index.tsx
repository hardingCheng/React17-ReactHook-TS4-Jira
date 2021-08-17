import React, { useState } from 'react'
import { Login } from './login'
import { Signup } from './signup'
import { Button, Card, Divider } from 'antd'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'

export const UnauthenticatedApp = () => {
  // 用来切换登录注册状态的
  const [ isRegister, setIsRegister ] = useState(true)
  const [ error, setError ] = useState<Error | null>(null)

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? '请登录' : '请注册'}</Title>
        {isRegister ? <Login /> : <Signup />}
        <Divider />
        <a onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '有账号？注册新账号' : '已经有账号了？直接登录'}
        </a>
      </ShadowCard>
    </Container>
  )
}

// 样式可以导出  复用很多
export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`


// css in js  解决方案
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  // 随着页面一起滑动
  background-attachment: fixed;
  // 左边  右边
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
  calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`
