import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { MuiThemeProvider } from 'material-ui/styles'

import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import Navbar from './navbar/Main'
import UserList from './user/Main'
import UserDetail from './user/Detail'
import UserEdit from './user/Edit'
import UserNew from './user/New'

class App extends Component {
  
    render() {
      return (
        <MuiThemeProvider >
          <div>
            <Navbar />
            <Router>
              <div>
                <Route exact path="/" component={UserList} />
                <Route exact path="/user/:id" component={UserDetail} />
                <Route exact path="/edit/:id" component={UserEdit} />
                <Route exact path="/new" component={UserNew} />
              </div>
            </Router>
          </div>
        </MuiThemeProvider>
      )
    }
  
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default App