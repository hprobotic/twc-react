// @flow
import React, { Component } from 'react';
import '@shopify/polaris/styles.css';
import { Avatar, DisplayText } from '@shopify/polaris';
import './App.css';

const renderPostEdit = currentUser => {};

const renderPost = post => (
  <div>
    <div>
      <div className="post-card">
        <div className="post-header">
          <div className="left-control">
            <a className="userPic" href="#">
              <Avatar customer name={post.userName} />
            </a>
            <div className="userInfo">
              <p class="name">
                <a href={post.userEmail} itemprop="sameAs" content="#">
                  <span itemprop="name">{post.userName}</span>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
        <div className="card-footer">
          <div className="footer-content">
            <div className="left-section">
              <div className="mainOptions">
                <button className="post-action">
                  <div className="buttonTextWrap">
                    <span className="btnText">Like</span>
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
      posts: [
        {
          userEmail: 'hprobotic@gmail.com',
          userName: 'John Pham',
          content: `I'm a young developer Seattle and for certain reasons
                        (misled by shady company that changes names yearly and
                        funnels young professionals into exploitation at a large
                        company), I really need to find a new job or income
                        source.`
        },
        {
          userEmail: 'hprobotic@gmail.com',
          userName: 'John Pham',
          content: `I'm a young developer Seattle and for certain reasons
                        (misled by shady company that changes names yearly and
                        funnels young professionals into exploitation at a large
                        company), I really need to find a new job or income
                        source.`
        },
        {
          userEmail: 'hprobotic@gmail.com',
          userName: 'John Pham',
          content: `I'm a young developer Seattle and for certain reasons
                        (misled by shady company that changes names yearly and
                        funnels young professionals into exploitation at a large
                        company), I really need to find a new job or income
                        source.`
        },
        {
          userEmail: 'hprobotic@gmail.com',
          userName: 'John Pham',
          content: `I'm a young developer Seattle and for certain reasons
                        (misled by shady company that changes names yearly and
                        funnels young professionals into exploitation at a large
                        company), I really need to find a new job or income
                        source.`
        },
        {
          userEmail: 'hprobotic@gmail.com',
          userName: 'John Pham',
          content: `I'm a young developer Seattle and for certain reasons
                        (misled by shady company that changes names yearly and
                        funnels young professionals into exploitation at a large
                        company), I really need to find a new job or income
                        source.`
        },
        {
          userEmail: 'hprobotic@gmail.com',
          userName: 'John Pham',
          content: `I'm a young developer Seattle and for certain reasons
                        (misled by shady company that changes names yearly and
                        funnels young professionals into exploitation at a large
                        company), I really need to find a new job or income
                        source.`
        }
      ]
    };
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <DisplayText className="App-title">Hello</DisplayText>
          </div>
        </header>
        <div className="container">
          <div className="new-feed">
            <div className="create-post-container">
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
                        renderPostEdit(currentUser)
                      ) : (
                        <p>What in your mind?</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-list">
              {this.state.posts.map(post => renderPost(post))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
