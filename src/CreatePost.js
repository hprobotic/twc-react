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

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextEditing: true,
      content: '',
      isPrivate: false,
      postBG: 1,
      id: '',
      isLiked: false
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

    this.setState(
      {
        id: new Date().toString(),
        content: this.state.content.trim()
      },
      () => {
        console.log(this.state);
        this.props.postSubmit(this.state);
      }
    );
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
              <Button onClick={this.handlePostSubmit.bind(this)} primary>
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
