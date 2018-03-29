import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

function mapStateToProps(state) {
    return {
        data: state.data,
        token: state.auth.token,
        loaded: state.data.loaded,
        isFetching: state.data.isFetching,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PostsView extends React.Component {
    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        this.props.fetchPostData();
    }

    render() {
        return (
            <div>
                <h1>Test H1</h1>
                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        <h1>{this.props.data.data.title}</h1>
                    </div>
                }
            </div>
        );
    }
}

PostsView.propTypes = {
    fetchPostData: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    userName: React.PropTypes.string,
    data: React.PropTypes.any,
    token: React.PropTypes.string,
};
