import React, { Component } from 'react';
import { Top } from '../../components/core';

import { firebaseDb } from '../../firebase';
const messagesRef = firebaseDb.ref('messages');

class Main extends Component {

  render() {
    return (
      <div className="a__top-main">
        <div className="b__top-main">
          <Top.ButtonAppBar />
          <div className="b__message-main">
            {this.props.posts.data &&this.props.posts.data.map((m, i) => (
              <Top.AlignItemsList key={i} data={m} />
            ))}

            {/* メッセージ送信のためのフォーム */}
            <div className="textArea">
              <Top.TextInput
                onChange={this.props.actions.posts.change}
                value={this.props.posts.value}
              />
              <Top.SendButton
                onClick={this.props.actions.posts.post}
                value={this.props.posts.value}
                image={this.props.posts.image}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
