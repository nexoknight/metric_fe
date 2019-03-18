import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'
import Layout from './components/Layout'
import Main from 'screens/Main'

class Router extends PureComponent {
  componentDidMount () {
    const { loadGroups } = this.props
    loadGroups()
  }

  render () {
    return (
      <Switch>
        <Layout>
          <Route path='/' component={Main} />
        </Layout>
      </Switch>
    )
  }
}

Router.propTypes = {
  loadGroups: PropTypes.func.isRequired
}

export default Router
