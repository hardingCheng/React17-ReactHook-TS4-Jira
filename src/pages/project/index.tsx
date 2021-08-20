import { Epic } from 'pages/epic'
import { Kanban } from 'pages/kanban'
import React from 'react'
import { Link,Navigate,Route,Routes } from 'react-router-dom'

export const ProjectDetail = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      {/*不能加 / 加了就成根路由了*/ }
      <Link to={ 'kanban' }>看板</Link>
      <Link to={ 'epic' }>任务组</Link>
      <Routes>
        {/*projects/:projectId/kanban*/ }
        <Route path={ '/kanban' } element={ <Kanban /> } />
        {/*projects/:projectId/epic*/ }
        <Route path={ '/epic' } element={ <Epic /> } />
        <Navigate to={ window.location.pathname + '/kanban' } />
      </Routes>
    </div>
  )
}
