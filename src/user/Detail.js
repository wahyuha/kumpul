import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import { getUser, deleteUser } from '../actions/users'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});

@connect((store) => {
  return {
    user: store.users.user,
  }
})
class Detail extends Component {

    constructor(props) {
      super(props)

      this.state = { 
        expanded: false,
        anchorEl: null,
        verticalMenu: false,
        dialog: false,
        favorite: '',
        deleted: false
      };
    }
  
    componentWillMount() {
      const userId = this.props.match.params.id
      this.props.dispatch(getUser(userId))
    }

    handleExpandClick = () => {
      this.setState({ expanded: !this.state.expanded });
    };

    handleClick = event => {
      this.setState({ verticalMenu: true, anchorEl: event.currentTarget });
    };
  
    handleRequestClose = () => {
      this.setState({ verticalMenu: false });
    };

    handleDelete = () => {
      this.setState({
        dialog: !this.state.dialog,
        verticalMenu: false
      })
    }

    handleFavorite = () => {
      this.setState({favorite: (this.state.favorite == '') ? 'accent' : ''})
      this.setState({ verticalMenu: false });
    }

    doDelete = () => {
      const userId = this.props.match.params.id
      this.props.dispatch(deleteUser(userId))

      this.setState({ 
        dialog: false,
        deleted: true
      });
    }

    handleDialogClose = () => {
      this.setState({ dialog: false });
    };  
  
    render() {
      const { classes, user } = this.props;
      if (this.state.deleted) {
        return (
          <Redirect to={""}/>
        )
      }
  
      return (
        <div>
          <Card className={classes.card}>
            <Grid container spacing={12}>
              <Grid item xs={10}>
                <CardHeader
                  avatar={
                    <Avatar aria-label={user.username} className={classes.avatar} src="../assets/img/weteha_thumb.jpg" />
                  }
                  title={user.username}
                  subheader={user.position+" at "+user.company}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton aria-label="Action">
                  <MoreVertIcon onClick={this.handleClick} />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={this.state.verticalMenu}
                  onRequestClose={this.handleRequestClose}
                >
                  <MenuItem onClick={this.handleRequestClose} component="a" href={"#/edit/"+user.id}>Edit</MenuItem>
                  <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                  <MenuItem onClick={this.handleFavorite}>Favorite</MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <CardMedia
              className={classes.media}
              image="../assets/img/weteha.png"
              title="Web Developer"
            />
            <CardContent>
              <Typography component="p">
                {user.biography}
              </Typography>
            </CardContent>
            <CardActions disableActionSpacing>
              <IconButton raised color={this.state.favorite} onClick={this.handleFavorite} aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              <div className={classes.flexGrow} />
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph type="body2">
                  Method:
                </Typography>
                <Typography paragraph>
                  {user.biography}
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                  heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                  browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                  chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                  salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                  minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                  cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                  Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                  the rice, and cook again without stirring, until mussels have opened and rice is
                  just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>

          <Dialog open={this.state.dialog} onRequestClose={this.handleRequestClose}>
            <DialogTitle>{"Delete "+user.username+"?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Proses delete tidak dapat di-undo. Pastikan menghapus data yang benar.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRequestClose} color="primary">
                Cancel
              </Button>
              <Button raised onClick={this.doDelete} color="accent">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Detail);

