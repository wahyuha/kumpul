import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Drawer from 'material-ui/Drawer';
import { FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu'
import AddIcon from 'material-ui-icons/Add'
import RefreshIcon from 'material-ui-icons/Refresh'

import { connect } from 'react-redux'
import { loadmoreON, loadmoreOFF } from '../actions/events'

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
drawing: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  control: {
    marginLeft: 20
  },
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  
})

@connect()
class App extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            loadmore: true, menu: false
        })
    }
    
    loadmoreSetting = (event, checked) => {
        if(checked)
            this.props.dispatch(loadmoreON())
        else 
            this.props.dispatch(loadmoreOFF())

        this.setState({ loadmore: checked })

    }

    render() {
      const classes = this.props.classes;

      return (
        <div className={classes.root}>
            <Drawer
                type="persistent"
                classes={{
                    paper: styles.drawerPaper,
                }}
                open={this.state.menu}
            >
                <div className={styles.drawerInner}>
                    <div className={styles.drawerHeader}>
                        <IconButton onClick={() => this.setState({ menu: false })}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Divider />
                        <Grid container spacing={0}>
                            <FormControlLabel className={styles.control}
                                control={
                                    <Switch
                                    checked={this.state.loadmore}
                                    onChange={this.loadmoreSetting}
                                    />
                                }
                                label="Loadmore"
                            />
                        </Grid>
                    </div>
                </div>
            </Drawer>
            <AppBar position="static">
                <Toolbar>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                    <MenuIcon onClick={()=>this.setState({ menu: true })} />
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
