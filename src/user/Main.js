import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import red from 'material-ui/colors/red';

// import Pagination from '../Pagination';

import { fetchUsers } from '../actions/users'

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // maxWidth: 752,
  },
  demo: {
    background: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  avatar: {
      backgroundColor: red[500]
  }
});


@connect((store) => {
  return {
    users: store.users.users,
    events: store.events.events
  }
})
class App extends React.Component {

  constructor(props) {
    super(props)
    
  }

  componentWillMount() {
    this.props.dispatch(fetchUsers())
  }

  render() {
    const { users, events } = this.props

    const classes = this.props.classes;
    const listNama = users.map(value => 

        <ListItem button component="a" href={"#/user/"+value.id} >
            <ListItemAvatar aria-label="W" className={classes.avatar}>
            <Avatar src="../assets/img/weteha_thumb.jpg" />
            </ListItemAvatar>
            <ListItemText
            primary={value.username}
            secondary={value.company}
            />
        </ListItem>

    )

    return (
      <div className={classes.root}>
          <Grid container>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List dense={true}>
                {listNama}
              </List>
            </div>
          </Grid>
        </Grid>

        {/* <Pagination
          total = { 20 }
          current = { 2 }
          display = { 5 }
          onChange = { number => this.setState({ number }) }
        /> */}
      </div>
      )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(App);  