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
        let posts = [];
        if(this.props.loaded) {
            let post_data = this.props.data.data;
            post_data.sort(function(a, b) {return b.id - a.id});

            for (let i = 0; i < post_data.length; i++) {
                posts.push(
                    <PostCard title={post_data[i].title} body={post_data[i].body}/>
                )
            }
        }
        return (
            <div>
                <h1>Posts</h1>
                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        {posts}
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
