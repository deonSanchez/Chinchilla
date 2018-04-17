import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = {
  button: {
    margin: 20,
  },
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsView extends React.Component {
    render() {
        return (
          <div className="col-md-8">
          <h1>Settings</h1>
          <hr />
          <TextField
          defaultValue="Default Username"
          floatingLabelText="Username"
          /><br />
          <TextField
          defaultValue="Default Email"
          floatingLabelText="Email Address"
          /><br />
          <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          defaultValue="Default Password"
          type="password"
          /><br />
          <br />
          <Toggle
          label="Make Anonymous"
          labelPosition="right"
          />
          <RaisedButton label="Update"
          style = {styles.button}
          />
          <RaisedButton label="Delete"
          style = {styles.button}
          />
          </div>
        );
    }
}
