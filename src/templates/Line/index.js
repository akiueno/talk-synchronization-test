import React, { Component } from 'react';
import { Top } from '../../components/core';

import { firebaseDb } from '../../firebase';
const messagesRef = firebaseDb.ref('messages');

class Main extends Component {
  constructor(props) {
    super(props)
    this.setState({
      post: this.props.posts,
    });
  }

  componentWillMount() {
    messagesRef.on('child_added', (snapshot) => {
      const m = snapshot.val();
      // console.log('snapshot');
      // console.log(m);
      // console.log('snapshot');
      let msgs = this.props.messages.msgs;

      msgs.push({
        image: m.image,
        text: m.text,
      });
      this.setState({
        msgs: msgs,
      });

      this.setState({
        post: this.props.posts,
      });
    })

    // let posts = this.props.posts;
    // this.setState({
    //   post: posts,
    // });
    ;
  }

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
