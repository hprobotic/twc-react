import React, { Component } from 'react';
import '@shopify/polaris/styles.css';
import {
  Avatar,
  DisplayText,
  Checkbox,
  Button,
  TextField,
  ChoiceList
} from '@shopify/polaris';
import uuidv5 from 'uuid/v5';
import './App.css';

const Post = props => {
  const { post } = props;
  return (
    <div key={post.postID}>
      <div>
        <div className="post-card">
          <div className="post-header">
            <div className="left-control">
              <a className="userPic" href="#">
                <Avatar customer name={post.userName} />
              </a>
              <div className="userInfo">
                <p className="name">
                  <a href={post.isPrivate ? '#' : post.userEmail}>
                    <span>
                      {post.isPrivate ? 'Anonymously' : post.userName}
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className={`post-content post-bg bg-style-${post.postBG}`}>
            <p>{post.content}</p>
          </div>
          <div className="card-footer">
            <div className="footer-content">
              <div className="left-section">
                <div className="mainOptions">
                  <button
                    className={
                      post.isLiked ? 'post-action active' : 'post-action'
                    }
                  >
                    <div className="buttonTextWrap">
                      <a
                        className="btnText"
                        onClick={() => props.handleLike(post)}
                      >
                        ★ {post.isLiked ? 'Unlike' : 'Like'}
                      </a>
                    </div>
                  </button>
                  <button className="post-action">
                    <div className="buttonTextWrap">
                      <a
                        className="btnText"
                        onClick={() => props.handleDelete(post)}
                      >
                        ☒ Delete
                      </a>
                    </div>
                  </button>
                </div>
              </div>
              <div className="right-section" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
