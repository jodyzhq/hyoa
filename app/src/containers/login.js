import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { localLogin } from '../actions/user'

function mapStateToProps(state) {
  return {
    status: state.user.message
  }
}

@connect(mapStateToProps, { localLogin })
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.userLogin = this.userLogin.bind(this)
    this.reset = this.reset.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  componentDidMount() {
    let socket = io()
    socket.on('login success', function(msg) {
      console.log('登录成功信息，从socket获取：'+ JSON.stringify(msg))

    })
  }

  handleUsername(evt) {
    this.setState({
      username: evt.target.value
    })
  }

  handlePassword(evt) {
    this.setState({
      password: evt.target.value
    })
  }

  userLogin(evt) {
    evt.preventDefault()
    this.props.localLogin({
      username: this.state.username, 
      password: this.state.password
    })
  }

  reset(e) {
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    let { content, type } = this.props.status
    return (
      <div className='login-container'>
        <div className='login-form'>
          <div className='title'>海云OA办公系统</div>
          {
            type == 'error' ?
              <span className='login-failed-text'>登录失败: {content}</span>
            :
              ''
          }
          <i className='username-icon'></i>
          <input className='username input' onChange={this.handleUsername} value={this.state.username} placeholder='请输入用户名' />
          <i className='password-icon'></i>
          <input type='password' className='password input' onChange={this.handlePassword} value={this.state.password} placeholder='请输入密码' />
          <button className='btn btn-reset' onClick={this.reset}>重置</button>
          <button className='btn btn-login' onClick={this.userLogin}>登录</button>
        </div>
      </div>
    )
  }
}