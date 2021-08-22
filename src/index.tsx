import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { DevTools, loadServer } from 'jira-dev-tool'
import 'antd/dist/antd.less'
import { AppProviders } from './pages/context'
import { Profiler } from 'components/profiler'

loadServer( () => {
  ReactDOM.render(
    <React.StrictMode>
      <Profiler id={ 'Root App' } phases={ [ 'mount' ] }>
        <AppProviders>
          <DevTools />
          <App />
        </AppProviders>
      </Profiler>
    </React.StrictMode>,
    document.getElementById( 'root' ),
  )
} )
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
