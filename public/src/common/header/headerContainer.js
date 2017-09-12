/**
 * Created by caoquang on 04/09/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {fetchPosts, resetDeletedPost, deletePost, deletePostSuccess, deletePostFailure} from '../actions/posts';
import {logoutUser} from '../../app/user/login/action/signinAction';
import Header from './headerComponent';


function mapStateToProps(state) {
    return {
        // deletedPost: state.posts.deletedPost,
        authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // onDeleteClick: () => {
        //     let token = sessionStorage.getItem('jwtToken');
        //     if (!token || token === '') { //if there is no token, dont bother,
        //         let data = {data: {message: 'Please Sign In'}};//axios like error
        //         dispatch(deletePostFailure(data)); // but let other comps know
        //         return;
        //     }
        //
        //     dispatch(deletePost(ownProps.postId, token))
        //         .then((response) => {
        //             !response.error ? dispatch(deletePostSuccess(response.payload)) : dispatch(deletePostFailure(response.payload));
        //         });
        // },
        // resetMe: () => {
        //     dispatch(resetDeletedPost());
        // },

        logout: () => {
            sessionStorage.removeItem('jwtToken');
            dispatch(logoutUser());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
