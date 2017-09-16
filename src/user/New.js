import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';

import { addOrEditUser } from '../actions/users'

import classnames from 'classnames';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    select: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit * 4,
        width: '100%',
        
    },
    inputRef: {
        marginBottom: theme.spacing.unit * 4,
    }
})

@connect()
class NewUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',            
            company: '',
            position: '',
            biography: '',
            industry: 'Information Technology',
            checkedMail: false,
            editFinished: false,
            mandatoryCek: true
        };
    }
      
    editUser = event => {
        const user = Object.assign({}, this.state)
        // remove unnecessary key
        delete user['checkedMail']
        delete user['editFinished']
        // end

        this.props.dispatch(addOrEditUser(user))
        this.setState({
            editFinished: true,
        });
        
    }

    render() {
      const { classes } = this.props;
      const editFinished = this.state.editFinished

      if (editFinished) {
        return (
          <Redirect to={""} />
        )
      }
  
      return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
            id="name"
            label="Name"
            className={classes.textField}
            defaultValue={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            onBlur={this.checkMandatory}
            margin="normal" />
            
            <TextField
            id="email"
            label="Email"
            defaultValue={this.state.email}
            className={classes.textField}
            onChange={event => this.setState({ email: event.target.value })}
            margin="normal" />

            <TextField
            id="company"
            label="Company"
            defaultValue={this.state.company}
            className={classes.textField}
            onChange={event => this.setState({ company: event.target.value })}
            margin="normal" />

            <TextField
            id="position"
            label="Position"
            defaultValue={this.state.position}
            className={classes.textField}
            onChange={event => this.setState({ position: event.target.value })}            
            margin="normal" />

            <Select
                value={this.state.industry}
                onChange={event => this.setState({ industry: event.target.value })}
                input={<Input id="age-simple" />}
                className={classes.select}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Accounting"}>Accounting</MenuItem>
                <MenuItem value={"Information Technology"}>Information Technology</MenuItem>
                <MenuItem value={"Marketing and Advertising"}>Marketing and Advertising</MenuItem>
                <MenuItem value={"Online Media"}>Online Media</MenuItem>
                <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                <MenuItem value={"Sport"}>Sport</MenuItem>
            </Select>

            <TextField
            id="multiline-static"
            label="Biography"
            multiline
            rows="4"
            defaultValue={this.state.biography}
            className={classes.textField}
            onChange={event => this.setState({ biography: event.target.value })}            
            margin="normal" />

            <Grid container spacing={12}>
              <FormControlLabel className={classes.inputRef}
                control={
                    <Switch
                    checked={this.state.checkedMail}
                    onChange={(event, checked) => this.setState({ checkedMail: checked })}
                    />
                }
                label="Show email address"
                />
            </Grid>
            <Button raised color="primary" className={classes.button} onClick={this.editUser}>
                Save
            </Button>
            
            
        </form>
      );
    }
  
}

NewUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewUser);

