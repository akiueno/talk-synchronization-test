import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
// import { bindActionCreators} from 'redux';
// import firebase from './firebase/index';
import LoadingOverlay from 'react-loading-overlay';

import { actions } from './redux/actions';

class Auth extends React.Component {
  state = {
    signinCheck: false, //ログインチェックが完了してるか
    signedIn: false, //ログインしてるか
  };

  _isMounted = false; //unmountを判断（エラー防止用）

  componentDidMount = async () => {
    //mountされてる
    this._isMounted = true;

    //ログインしてるかどうかチェックしてる
    console.log('auth in mount');
    console.log(this.props);
    console.log(this.props.auth);
    console.log('auth in mount');

    const { auth } = this.props;

    console.log(this.props.auth.uid);

    if (auth.uid) {
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

  componentWillUnmount = () => {
    this._isMounted = false;
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
      if (true) {
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, null)(Auth);
