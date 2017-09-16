import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import AddIcon from 'material-ui-icons/Add'
import RefreshIcon from 'material-ui-icons/Refresh'

const styles = theme => ({
root: {
    // marginTop: theme.spacing.unit * 3,
    width: '100%',
},
flex: {
    flex: 1,
    textDecoration: 'none'
},
menuButton: {
    marginLeft: -12,
    marginRight: 0,
},
})

class App extends Component {

    constructor(props) {
        super(props)
    }
  
    render() {
      const classes = this.props.classes;

      return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={classes.flex}>
                    kumpulan
                </Typography>
                <IconButton className={classes.button} color="contrast" aria-label="Refresh" href="/">
                    <RefreshIcon />
                </IconButton>
                <IconButton className={classes.button} color="contrast" aria-label="Add" href="#/new">
                    <AddIcon />
                </IconButton>
                </Toolbar>
            </AppBar>
        </div>
      )
    }
  
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(App);