import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import Search from 'material-ui/svg-icons/action/search';



import * as actionCreators from '../../actions/auth';

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDialog: false,
    };
  }

  dispatchNewRoute(route) {
    browserHistory.push(route);
    this.setState({
      open: false,
    });
  }

  handleOpen = () => {
    this.setState({openDialog: true});
  };

  handleClose = () => {
    this.setState({openDialog: false});
  };

  handleClickOutside() {
    this.setState({
      open: false,
    });
  }

  logout(e) {
    e.preventDefault();
    this.props.logoutAndRedirect();
    this.setState({
      open: false,
    });
  }

  openNav() {
    this.setState({
      open: true,
    });
  }

  render() {
    var navFlatButtonsStyle = {
      color: 'white'
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Post"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <header>
      <LeftNav open={this.state.open}>
      {
        !this.props.isAuthenticated ?
        <div>
        <MenuItem onClick={() => this.dispatchNewRoute('/posts')}>
        Posts
        </MenuItem>
        <MenuItem onClick={() => this.dispatchNewRoute('/login')}>
        Login
        </MenuItem>
        <MenuItem onClick={() => this.dispatchNewRoute('/register')}>
        Register
        </MenuItem>
        </div>
        :
        <div>
        <MenuItem onClick={() => this.dispatchNewRoute('/posts')}>
        Posts
        </MenuItem>
        <MenuItem onClick={() => this.dispatchNewRoute('/analytics')}>
        Analytics
        </MenuItem>
        <Divider />
        <MenuItem onClick={(e) => this.logout(e)}>
        Logout
        </MenuItem>
        </div>
      }
      </LeftNav>
      <AppBar
      title="Chinchilla"
      onLeftIconButtonTouchTap={() => this.openNav()}
      iconElementRight=
        {
            !this.props.isAuthenticated ?
            <div style={{padding: '6px'}}>
            <FlatButton label="Posts" style={navFlatButtonsStyle} onClick={() => this.dispatchNewRoute('posts')} />
            <FlatButton label={"Search"} icon={<Search />} style={navFlatButtonsStyle} onClick={this.handleOpen} />
            </div>
            :
            <div style={{padding: '6px'}}>
            <FlatButton label="Posts" style={navFlatButtonsStyle} onClick={() => this.dispatchNewRoute('/')} />
            <FlatButton label={"New"} icon={<AddCircle />} style={navFlatButtonsStyle} onClick={this.handleOpen} />
            <FlatButton label={"Search"} icon={<Search />} style={navFlatButtonsStyle} />
              <Dialog
                actions={actions}
                modal={false}
                open={this.state.openDialog}
                onRequestClose={this.handleClose}
                >
              <TextField
                floatingLabelText="What's going on?"
                multiLine={true}
                fullWidth={true}
                rows={2}
                rowsMax={4}
                /><br />
              </Dialog>
            </div>
      }
      />
      </header>

    );
  }
}

Header.propTypes = {
  logoutAndRedirect: React.PropTypes.func,
  isAuthenticated: React.PropTypes.bool,
};
