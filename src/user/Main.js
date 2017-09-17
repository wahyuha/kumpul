import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import red from 'material-ui/colors/red';
import { CircularProgress } from 'material-ui/Progress'

import Pagination from '../Pagination';

import { connect } from 'react-redux'
import { fetchUsers } from '../actions/users'
import { loadmoreStatus } from '../actions/events'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  demo: {
    background: theme.palette.background.paper,
  },
  progress: {
    textAlign: 'center',
  },
  avatar: {
      backgroundColor: red[500]
  }
});


@connect((store) => {
  return {
    users: store.users.users,
    loadmore: store.events.loadmore
  }
})
class App extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = ({
      loadmore: {
        progress: 'going',
        done: false
      },
      current: 1,
      total: 1,
      display: 5,
      message:''
    })
  }

  componentWillMount() {
    this.props.dispatch(fetchUsers())

    // handle scrollbar
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      var { users } = this.props
      const { current } = this.state

      if(this.props.loadmore) {

        if(current < users.length/10) { // limit
          this.setState({ 
            loadmore: {
              ...this.state.loadmore,
              progress:'going'
            }
          })
          setTimeout(()=>{
            var { users } = this.props
            const { current } = this.state

            this.setState({ 
              current: this.state.current+1,
              loadmore: {
                ...this.state.loadmore,
                progress:'finish'
              }
            })         
          },1000)
        }

      }

    }
  }

  componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    var { users, loadmore, classes } = this.props

    var perpage = 10 // view per page
    var total = users.length/perpage // total all

    if(loadmore)// mode: loadmore
      var bottom = 0 // batas posisi bawah
    else // mode: pagination
      var bottom = (perpage*(this.state.current-1)) - 1 // batas posisi bawah
    
    var top = perpage*this.state.current  // batas posisi atas
    
    var userFix = Object.assign([], users.filter((user, ind) => ind > bottom && ind < top))

    const listNama = userFix.map((value, index) => 
        <ListItem button component="a" href={"#/user/"+value.id} key={index} >
            <ListItemAvatar aria-label="W" className={classes.avatar}>
            <Avatar src="../assets/img/weteha_thumb.jpg" />
            </ListItemAvatar>
            <ListItemText
            primary={value.username}
            secondary={value.company}
            />
        </ListItem>
    )

    const pagination = !loadmore ? (<Pagination
                        total = { total }
                        current = { this.state.current }
                        display = { this.state.display }
                        onChange = { number => this.setState({ current: number }) }
                      />) : ''
      
    const progress = this.state.loadmore.progress == 'going' ? (<div className={classes.progress}><CircularProgress size={50} /></div>) : ''

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
          {progress}
          {pagination}
      </div>
      )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);  
