import React, { Component } from 'react'
import { Router } from 'react-router'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/ru'
import createdTheme from './createdTheme'
import createdHistory from './createdHistory'
import Routes from './routers'

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={createdTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={'ru'} moment={moment}>
          <Router history={createdHistory}>
            <Routes />
          </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    )
  }
}

export default App
