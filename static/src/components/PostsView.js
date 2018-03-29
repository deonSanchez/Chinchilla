import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';
import PostCard from "./PostCard";

function mapStateToProps(state) {
    return {
        data: state.data,
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
        this.props.fetchData();
    }

    render() {
        return (
            <div>
                <h1>Posts</h1>
                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        <PostCard title={this.props.data.data.title} body={this.props.data.data.body} />
                    </div>
                }
            </div>
        );
    }
}

PostsView.propTypes = {
    fetchData: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    data: React.PropTypes.any,
};
