import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import configureStore from 'src/store/configureStore'
import { redirectToBack, redirctToLogin } from '../src/util/authUtil'

import Home from 'src/containers/home'
import DefaultIndex from 'src/containers/default'
import NewsList from 'src/containers/newsList'
import Login from 'src/containers/login'
import NewDetail from 'src/containers/newDetail'
import Notice from 'src/containers/notice'  //公告列表
import NoticeComtent from 'src/containers/noticeContent' //公告内容
import SendNotice from 'src/containers/sendNotice' //发布公告
import SendProcedure from 'src/containers/SendProcedure' //发起流程
import Procedure from 'src/containers/procedure' //流程管理
import ToDo from 'src/containers/todo' //待办事项
import MakingMatters from 'src/containers/makingMatters' //办结事项
import PersonInfo from 'src/containers/personInfo' //人员信息
import SurplusRest from 'src/containers/surplusRest' //剩余调休




/**
 * 所有路由信息
 * 控制台报如下错误：Warning: Failed propType: Invalid prop `component` supplied to `Route`.
 * 原因：组件内容为空，或import 和 export default / module.exports 和 require没有匹配
 * @export
 * @param {any} history
 * @returns 路由组件
 */
export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={DefaultIndex}>
        <Route path="login" component={Login} onEnter={redirectToBack} />
        <Route path="logout" component={Login} />
        <Route path="index" component={Home} onEnter={redirctToLogin}>
          <Route path="notice" component={Notice} />
          <Route path="sendnotice" component={SendNotice} />
          <Route path="notice/:id" component={NoticeComtent} />
          <Route path="procedure/send" component={SendProcedure} />
          <Route path="procedure/manage" component={Procedure} />
          <Route path="procedure/todo" component={ToDo} />
          <Route path="procedure/matters" component={MakingMatters} />
          <Route path="info/person" component={PersonInfo} />
          <Route path="info/rest" component={SurplusRest} />
        </Route>
        <IndexRoute component={Login} onEnter={redirectToBack} />
      </Route>
    </Router>
  )
}