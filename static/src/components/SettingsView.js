import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsView extends React.Component {
    render() {
        return (
            <div className="col-md-8">
                <h1>Settings</h1>
                <hr />
            </div>
        );
    }
}
