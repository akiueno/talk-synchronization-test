import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './firebase/index';
import LoadingOverlay from 'react-loading-overlay';

class Auth extends React.Component {

    state = {
        signinCheck: false, //ログインチェックが完了してるか
        signedIn: false, //ログインしてるか
    }

    _isMounted = false; //unmountを判断（エラー防止用）

    user = {
      uid: "",
      name: ""
    }

  auth() {
      //ログインしてるかどうかチェックしてる
      firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          // ログインしている
          console.log(user); // null
          console.log(user.displayName); // null
          console.log(user.displayName); // null
          console.log(user.email);
          console.log(user.emailVerified); // false
          console.log(user.photoURL); // null
          console.log(user.isAnonymous); // false
          console.log(user.uid);
          console.log(user.providerData);
          console.log(user.refreshToken);

          if (this._isMounted) {
            this.setState({
              signinCheck: true,
              signedIn: true,
            });
          }

          this.user.uid = user.uid;

          // firestoreからuser情報を取得する
          await firebase
            .firestore()
            .collection('admin_users')
            .where('uid', '==', this.user.uid)
            .get()
            .then((querySnapshot) => {
              console.log(querySnapshot)
              console.log(querySnapshot.docs);
              console.log(querySnapshot.docs[0]);
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, ' => ', doc.data());
                this.user.name = doc.data().name
              });
            })
            .catch(function (error) {
              console.log('Error getting document:', error);
            });
        } else {
          //ログインしてない
          if (this._isMounted) {
            this.setState({
              signinCheck: true,
              signedIn: false,
            });
          }
        }
      });

    }

    componentDidMount = () => {
                                //mountされてる
                                this._isMounted = true;

                                //ログインしてるかどうかチェックしてる
                                this.auth();
                              }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        //チェックが終わってないなら（ローディング表示）
        if (!this.state.signinCheck) {
            return (
                <LoadingOverlay
                    active={true}
                    spinner
                    text='Loading...'
                >
                    <div style={{ height: '100vh', width: '100vw' }}></div>
                </ LoadingOverlay>
            );
        }

        //チェックが終わりかつ
        if (this.state.signedIn) {
            // サインインしてるとき（そのまま表示）
            if (this.user.name) {
              return this.props.children;
            } else {
              // 名前を登録していないとき（プロフィール画面にリダイレクト）
              return <Redirect to="/profile" />;
            }
        } else {
            //サインインしてないとき（ログイン画面にリダイレクト）
            return <Redirect to="/signin" />
        }
    }
}

export default Auth;
