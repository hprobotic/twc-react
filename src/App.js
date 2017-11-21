// @flow
import React, { Component } from 'react';
import '@shopify/polaris/styles.css';
import { Avatar, DisplayText, Button } from '@shopify/polaris';
import './App.css';
import CreatePost from './CreatePost';
import Post from './Post';

var postsData = JSON.parse(localStorage.getItem('postsData')) || [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenEditor: false,
      currentUser: {
        userName: 'Faker',
        userEmail: 'faker@lol.com',
        userId: 1
      },
      posts: postsData
    };
  }

  handlePostSubmit = postData => {
    if (!postData.isPrivate) {
      postData['userEmail'] = this.state.currentUser.userEmail;
      postData['userName'] = this.state.currentUser.userName;
    }
    const postsData = [postData, ...this.state.posts];
    this.setState(
      {
        isOpenEditor: false,
        posts: postsData
      },
      () => {
        localStorage.setItem('postsData', JSON.stringify(postsData));
      }
    );
  };

  handleLike = post => {
    let posts = this.state.posts.map(postItem => {
      if (post.id === postItem.id) {
        return {
          ...postItem,
          isLiked: !post.isLiked
        };
      }
      return postItem;
    });
    this.setState(
      {
        posts
      },
      () => {
        localStorage.setItem('postsData', JSON.stringify(posts));
      }
    );
  };

  handleDelete = post => {
    this.setState(
      {
        posts: this.state.posts.filter(item => item.id !== post.id)
      },
      () => {
        localStorage.setItem('postsData', JSON.stringify(this.state.posts));
      }
    );
  };

  render() {
    const { currentUser, posts } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <DisplayText className="App-title">MiniTwitter</DisplayText>
          </div>
        </header>
        <div className="container">
          <div className="new-feed">
            <div
              className={
                this.state.isOpenEditor
                  ? 'create-post-container isEditing'
                  : 'create-post-container'
              }
            >
              <div className="create-post">
                <div className="meta-data">
                  <div className="user-info">
                    <div className="user-avatar">
                      <Avatar customer name={currentUser.userName} />
                    </div>
                    <div className="user-name">
                      <p>{currentUser.userName}</p>
                    </div>
                  </div>
                </div>
                <div className="create-post-placeholder">
                  <div className="create-text-placholder">
                    <div className="placeholder-container">
                      {this.state.isOpenEditor ? (
                        <CreatePost
                          postSubmit={postData =>
                            this.handlePostSubmit(postData)
                          }
                        />
                      ) : (
                        <p
                          onClick={() => this.setState({ isOpenEditor: true })}
                        >
                          What in your mind?
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-list">
              {posts.map(post => (
                <Post
                  post={post}
                  handleLike={() => this.handleLike(post)}
                  handleDelete={() => this.handleDelete(post)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
