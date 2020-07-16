import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux';
// import firebase from './firebase/index';
import LoadingOverlay from 'react-loading-overlay';

import { actions } from './redux/actions';

class Auth extends React.Component {
  state = {
    signinCheck: false, //ログインチェックが完了してるか
    signedIn: false, //ログインしてるか
  };

  _isMounted = false; //unmountを判断（エラー防止用）

  async auth() {
    console.log('actions');
    console.log(this.props.actions);
    console.log(this.props.actions.auth);
    console.log(this.props.actions.auth.type);
    console.log(this.props.actions.auth.pyload);
    console.log(this.props.actions.messages);
    console.log(this.props.actions.messages.submit.type);
    console.log(this.props.actions.messages.submit.pyload);
    console.log('actions');
    console.log('process auth');

    await this.props.actions.auth;
  }

  componentDidMount = async () => {
    //mountされてる
    this._isMounted = true;

    //ログインしてるかどうかチェックしてる
    console.log('auth in mount');
    console.log(this.props);
    console.log(this.auth());
    console.log('auth in mount');

    await this.auth().then(() => {
      console.log('end auth');
    });

    console.log('adminuser');
    console.log(this.props);
    console.log(this.props.adminUser);
    console.log(this.props.adminUser.name);
    console.log('adminuser');

    if (this.props.adminUser) {
      if (this._isMounted) {
        this.setState({
          signinCheck: true,
          signedIn: true,
        });
      }
    } else {
      //ログインしてない
      if (this._isMounted) {
        this.setState({
          signinCheck: true,
          signedIn: false,
        });
      }
    }
  };

  componentWillUnmount = async () => {
    this._isMounted = false;
    await this.auth().then(() => {
      console.log('end auth before mount');
    });
  };

  render() {
    //チェックが終わってないなら（ローディング表示）
    if (!this.state.signinCheck) {
      return (
        <LoadingOverlay active={true} spinner text="Loading...">
          <div style={{ height: '100vh', width: '100vw' }}></div>
        </LoadingOverlay>
      );
    }

    //チェックが終わりかつ
    if (this.state.signedIn) {
      // サインインしてるとき（そのまま表示）
      if (this.props.adminUser.name) {
        return this.props.children;
      } else {
        // 名前を登録していないとき（プロフィール画面にリダイレクト）
        return <Redirect to="/profile" />;
      }
    } else {
      //サインインしてないとき（ログイン画面にリダイレクト）
      return <Redirect to="/signin" />;
    }
  }
}


const mapStateToProps = (state) => ({ adminUser: state.auth })

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      auth: bindActionCreators(actions.auth, dispatch),
      messages: bindActionCreators(actions.messages, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
