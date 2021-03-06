import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/home'
import { Link } from 'react-router'
import _ from 'lodash'
import Items from '../components/items'
import { bindActionCreators } from 'redux'

const styles = {
  h2: {
    color: 'red'
  }
}

function mapStateToProps (state) {
  console.log('当前state', state)
  return { items: state.home.items }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '123'
    }
    console.log(this.state)
  }

  componentDidMount() {
    const { loadNewsList } = this.props.actions
    loadNewsList()
  }
  render() {
    console.log('this.props.items', this.props)
    debugger
    return (
      <div>
        <h2 style={styles.h2}>Item bzn</h2>
        <Items items={this.props.items} />
        <Link to="/">Back to Home</Link>
      </div>
    )
  }
}

