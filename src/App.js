// @flow
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

var postsData = JSON.parse(localStorage.getItem('postsData')) || [];
export class PostEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextEditing: true,
      content: '',
      isPrivate: false,
      postBG: 1,
      postId: 0
    };
  }

  handleTextChange = (value, id) => {
    this.setState({
      content: value
    });
  };

  handlePrivacyChange = (value, id) => {
    this.setState({
      isPrivate: value
    });
  };

  handleBackgroundChange = (value, name) => {
    this.setState({
      postBG: value[0]
    });
  };

  handlePostSubmit = () => {
    if (this.state.content.length === 0) {
      alert('Please put your content!!!');
      return false;
    }
    const currentTime = uuidv5('jp.odau.me', uuidv5.DNS);
    console.log(currentTime);
    this.setState({
      postId: currentTime,
      content: this.state.content.trim()
    });
    this.props.postSubmit(this.state);
  };

  render() {
    return (
      <div className="editor-container">
        <div className="main-editor">
          <div className={`raw-text post-bg bg-style-${this.state.postBG}`}>
            <TextField
              placeholder="What in your mind?"
              value={this.state.content}
              multiline
              autoFocus
              maxLength={140}
              onChange={(value, id) => this.handleTextChange(value, id)}
            />
            <div className="post-bg-options">
              <ChoiceList
                title="Choose background"
                choices={[
                  {
                    label: 'Heart',
                    value: 1
                  },
                  {
                    label: 'Colors',
                    value: 2
                  },
                  {
                    label: 'Freedom',
                    value: 3
                  },
                  {
                    label: 'Love',
                    value: 4
                  }
                ]}
                selected={[this.state.postBG]}
                onChange={(value, name) =>
                  this.handleBackgroundChange(value, name)
                }
              />
            </div>
            <div className="typing-status">
              {this.state.content.length}/140 characters
            </div>
          </div>
          <div className="action-control">
            <div className="left-actions">
              <Checkbox
                label="Post private"
                checked={this.state.isPrivate}
                onChange={(value, id) => this.handlePrivacyChange(value, id)}
              />
            </div>
            <div className="right-actions">
              <Button onClick={this.handlePostSubmit} primary>
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function NewFeed(props) {
  const { post } = props;
  return (
    <div key={post.postId}>
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
                  <button className="post-action">
                    <div className="buttonTextWrap">
                      <a
                        className="btnText"
                        onClick={() => props.handleLike(post)}
                      >
                        Like
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
}

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
    localStorage.setItem('postsData', JSON.stringify(postsData));
    this.setState({
      isOpenEditor: false,
      posts: postsData
    });
  };

  handleLike = post => {
    console.log(post);
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
                        <PostEdit
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
              {this.state.posts.map(post => (
                <NewFeed post={post} handleLike={() => this.handleLike(post)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
